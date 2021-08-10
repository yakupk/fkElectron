const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const Store = require('electron-store');
require('dotenv').config({path: __dirname + '/.env'});
const { NFC } = require('nfc-pcsc');
const fetch = require('node-fetch');
const log = require('electron-log');
const {ipcMain} = require('electron');
const { autoUpdater } = require('electron-updater');


console.log("ENV FİLE PATH :", __dirname + '/.env')

console.log("LOGİN URL PATH : ->", process.env.API_LOGIN_PASSWORD_TOKEN_URL)
/* External Nodes */
//const ccid = require("./../src/main-process/ccid");
//const helpers = require('./../src/main-process/helpers');

/* External Nodes */
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = '1';
let mainWindow;
const store = new Store();
ipcMain.on('make_me_login', (event, arg) => {
  makeMeLoggedIn();
  event.returnValue = 'success';
});

console.log({isDev})
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    if(isDev) {
      alwaysOnTop = true;
      kiosk = true;
    },
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false
    }
  });

  !isDev && mainWindow.setMenu(null);
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${__dirname}/../build/index.html`
  );

  mainWindow.webContents.on('did-finish-load', () => mainWindow.webContents.send('test', '🤘'));

  const filter = {
    urls: ['https://apitest.faturakom.com/reseller/v1'+'/*']
  };
  electron.session.defaultSession.webRequest.onHeadersReceived(filter, (details, callback) => {
    console.log("onHeadersReceived")
    //console.log("onHeadersReceivedResp------>>>> :", details);
     console.log("STATUS CODE : ", details.statusCode,details.url)
    if (details.statusCode === 401 ) {
      store.set('actionToken',null);
      makeMeLoggedIn("401 alınca" );
    }
    return callback({ cancel: false, requestHeaders: details.requestHeaders });

  });
  electron.session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    console.log("onBeforeSendHeaders", details.url)
    delete details.requestHeaders["Content-Type"];
    delete details.requestHeaders["X-Action-Token"];
    details.requestHeaders["Content-Type"] = 'Application/json';
    details.requestHeaders["X-Action-Token"] = store.get('actionToken');
    return callback({ cancel: false, requestHeaders: details.requestHeaders })
  });
  electron.session.defaultSession.webRequest.onCompleted(filter, (details) => {
    //console.log("onCompleted :",details);
  });
  electron.session.defaultSession.webRequest.onErrorOccurred(filter, (details) => {
    console.log("ERROR oluştu ....")
    log.warn(details);
    console.log("onErrorOccurred :", details);
  })
}


class Login {
  constructor(url , credential) {
    this.url = url;
    this.credential = credential;
    this.passwordToken = null;
    this.actionToken = null;
  }

  async makeRequestWithFetch(options){
    try {
      return await fetch(options.url, {
        method: options.method,
        body: JSON.stringify(options.data),
        headers: options.headers
      }).then(res => res.json())
          .then(json => {
            console.log("JSON", json, options.url);
            return json
          });
    } catch (error) {
      console.log("Make Request ERROR :",error);
      return null
    }

  }

  async getPasswordToken() {
    const options =  {
      headers : {
        "Content-Type": "application/json",
      } ,
      data : {
        username : this.credential.username,
        password : this.credential.password
      },
      method:"POST",
      url : this.url.passwordTokenUrl
    };
    const retVal = await this.makeRequestWithFetch(options);
    return this.passwordToken =  retVal.success ?  retVal.result.password_token  : null ;
  }

  async getActionToken() {
    await this.getPasswordToken();
    console.log("this PASSWORD TOKEN :", this.passwordToken)
    if(this.passwordToken !== null){
      const options = {
        headers : {
          "X-Action-Token" : this.passwordToken,
          "Content-Type": "application/json",
        },
        data : {
          "verification_type": "password",
          "token": this.passwordToken,
          "code": this.credential.cipher
        },
        method : "POST",
        url : this.url.actionTokenUrl
      };
      const retVal = await this.makeRequestWithFetch(options);
      this.actionToken =  retVal.success ?  retVal.result.action_token  : null ;
      console.log("THİS ACTION TOKEN :", this.actionToken);
      return this.actionToken;
    }
  }

}

let activeWindow;
const CARD_STATUS_CHANNEL = 'card_channel';
function initNFC(mainWindow){
  activeWindow = mainWindow;
}

function nfcReader(){
  const nfc = new NFC();
  nfc.on('reader', reader => {
    console.log(`${reader.reader.name}  device attached`);

    reader.autoProcessing = false;

    reader.on('card', async card => {
      console.log("CARD ",card)
      activeWindow.webContents.send(CARD_STATUS_CHANNEL,"card_on" );
    });

    reader.on('card.off', card => {
      console.log("CARD OFF ",card)
      activeWindow.webContents.send(CARD_STATUS_CHANNEL,"card_off" );
    });

    reader.on('error', err => {
      console.log("CARD ERROR ",card)
      activeWindow.webContents.send(CARD_STATUS_CHANNEL,"card_error" );
    });

    reader.on('end', () => {
      console.log("CARD END ",card)
      activeWindow.webContents.send(CARD_STATUS_CHANNEL,"card_end" );
    });

  });

  nfc.on('error', err => {
    console.log('an error occurred', err);
  });
}

  makeMeLoggedIn = (comingPage) => {
  console.log("makeMeLoggedIn",comingPage);
  const url = {
    passwordTokenUrl:'https://apitest.faturakom.com/reseller/v1/auth/password-token',
    actionTokenUrl :'https://apitest.faturakom.com/reseller/v1/auth/action-token',
  };
  const credential = {
    username :'5531228797',
    password :'Uysali55',
    cipher :'00000',
  };
  const login = new Login(url, credential);
  login.getActionToken().then(result=>{
    if(result !== undefined && result){
      console.log({result})
      console.log("Login Response : ", result)
      activeWindow.webContents.send("is_auth","success" );
      store.set('actionToken',result);
    }
  }).catch(error=>{
    console.log("ERRIR :",error);
  });
}

app.whenReady().then(() => {
  store.delete('actionToken')
  createWindow();
  initNFC(mainWindow);
  nfcReader();
  /*const tmpActionToken  = store.get('actionToken')
  console.log("Action Token :", store.get('actionToken'))*/
  /*if(tmpActionToken == null  ){

  }*/
  ///makeMeLoggedIn("appReady olunca");
  mainWindow.webContents.openDevTools()
  mainWindow.on("close", () => {
    mainWindow = null;
    app.quit();
  });
});


app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
  mainWindow.removeAllListeners('close');
  mainWindow.close();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

