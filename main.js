const { app, BrowserWindow, screen } = require('electron');

// app.commandLine.appendSwitch('--enable-features', 'OverlayScrollbar');

let win;

// scrollBounce: true,
function createWindow() {
    const electronScreen = screen;
    const size = electronScreen.getPrimaryDisplay().workAreaSize;
    // Create the browser window.
    win = new BrowserWindow({
        width: size.width,
        height: size.height,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: true,
            blinkFeatures: 'OverlayScrollbars'
        },
    });

    win.loadURL(`file://${__dirname}/dist/backtest-converter/index.html`);


    // uncomment below to open the DevTools.
    // win.webContents.openDevTools();

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
