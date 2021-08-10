/*
module.exports = {
    init,
    nfcReader,
};
const { NFC } = require('nfc-pcsc');

let activeWindow;
const CARD_STATUS_CHANNEL = 'card_channel';

function init(mainWindow){
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

*/
