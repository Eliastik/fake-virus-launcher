const { app, BrowserWindow, ipcMain } = require("electron")
const url = require("url");
const path = require("path");

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/fake-virus-pack/index.html`),
            protocol: "file:",
            slashes: true
        })
    );

    mainWindow.removeMenu();
    mainWindow.setResizable(false);

    mainWindow.on("closed", function () {
        mainWindow = null
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit()
});

app.on("activate", function () {
    if (mainWindow === null) createWindow()
});

ipcMain.on('launch', (event, arg) => {
    console.log(arg, event);
    const executablePath = ".\\assets\\" + arg.program.exec;
    const child = require('child_process').execFile;
    console.log(executablePath, child);
    child(executablePath, arg, function (err, data) {
        console.log(data.toString());
        event.returnValue = data;
    });
});