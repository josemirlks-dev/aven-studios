const {app, BrowserWindow, dialog, ipcMain} = require("electron");
const fs = require("fs");

let win;

function createWindow(){
    win = new BrowserWindow({
        width: 1200,
        height: 700,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        }
    });

    win.loadFile("index.html");
}

app.whenReady().then(createWindow);

ipcMain.handle("openFile", async ()=>{
    const result = await dialog.showOpenDialog({
        filters:[{name:"Lua", extensions:["lua","txt"]}]
    });

    if(result.canceled) return null;

    return fs.readFileSync(
        result.filePaths[0],
        "utf8"
    );
});

ipcMain.handle("saveFile", async(event,data)=>{
    const result = await dialog.showSaveDialog({
        filters:[{name:"Lua", extensions:["lua"]}]
    });

    if(result.canceled) return;

    fs.writeFileSync(result.filePath,data);
});
