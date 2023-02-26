const { app, BrowserWindow, ipcMain, shell } = require("electron")
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
    const path = (process.env.PORTABLE_EXECUTABLE_DIR ? process.env.PORTABLE_EXECUTABLE_DIR : app.getAppPath()) + "\\assets\\";
    const executablePath = "start cmd.exe /C \"" + path + arg.program.exec + "\"" + (arg.isFullscreen ? " /fullscreen" : "");
    const child = require('child_process').exec;

    child(executablePath, { cwd: path }, function (err, _stdout, stderr) {
        if(err || stderr) {
            event.returnValue = {
                code: "error",
                data: err ? err : stderr
            };
        }
    });

    setTimeout(() => {
        event.returnValue = {
            code: "success",
            data: null
        };
    }, 1000)
});

ipcMain.on('launch-website', () => {
    shell.openExternal("https://www.eliastiksofts.com");
});

ipcMain.on('launch-update', () => {
    shell.openExternal("https://www.eliastiksofts.com/faux-virus/downloads");
});