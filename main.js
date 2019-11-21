const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        backgroundColor: '#f0f0f0',
        icon: `file://${__dirname}/dist/backtest-converter/favicon.ico`,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: true,
        },
    });

    win.loadURL(`file://${__dirname}/dist/backtest-converter/index.html`);


    //// uncomment below to open the DevTools.
    win.webContents.openDevTools();

    // Event when the window is closed.
    win.on('closed', function () {
        win = null
    });
}

// Create window on electron intialization
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
});
