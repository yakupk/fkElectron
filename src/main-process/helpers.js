const Store = require('electron-store');
const store = new Store();
const Login = require("./Login");


exports.makeMeLoggedIn = () => {
    console.log("TEST LOGIN")
    const url = {
        passwordTokenUrl:process.env.API_LOGIN_PASSWORD_TOKEN_URL,
        actionTokenUrl :process.env.API_LOGIN_ACTION_TOKEN_URL,
    };
    const credential = {
        username :process.env.API_LOGIN_USERNAME,
        password :process.env.API_LOGIN_PASSWORD,
        cipher :process.env.API_LOGIN_CIPHER,
    };
    console.log(credential);
    console.log(url);
    const login = new Login(url, credential);
    login.getActionToken().then(result=>{
        if(result !==undefined && result){
            store.set('actionToken',result);
        }
    }).catch(error=>{
        console.log("ERRIR :",error);
    });
}
