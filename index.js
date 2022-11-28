const {app, BrowserWindow, ipcMain} = require("electron");
const {PosPrinter} = require("electron-pos-printer");

let win;

app.on('ready', () => {
    win = new BrowserWindow({
        width: 650,
        height: 450,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.loadFile('src/index.html');
    win.webContents.openDevTools();
})

ipcMain.on('print', (event, arg) => {
    const data = JSON.parse(arg);
    //printer
    PosPrinter.print(data, {
        printerName: 'RETSOL-RTP82',
        preview: false,
        copies: 1,
        timeOutPerLine: 400,
        pageSize: '80mm' // page size
    }).catch(error => console.error(error))
})