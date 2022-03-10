'use strict';

const {app, BrowserWindow, Tray, Menu} = require('electron');
const path = require('path');
var ipc = require('electron').ipcMain;

let isQuiting;
let tray;

app.on('before-quit', function () {
  isQuiting = true;
});
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  tray = new Tray(path.join(__dirname, 'icon.ico'));

  tray.setContextMenu(Menu.buildFromTemplate([
    {

      label: 'Show App', click: function () {
        mainWindow.show();
      }
    },
    {
      label: 'Quit', click: function () {
        isQuiting = true;
        app.quit();
      }
    }
  ]));

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 715, 
    height: 400,
    transparent:true,
    frame: false,
    show: false,
    minWidth: 715,
    minHeight: 400,
    resizable :false,
    icon:'./icon.png'});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  //mainWindow.webContents.openDevTools({ mode: 'detach' });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
   // 
    if(!isQuiting){
      mainWindow.hide();

    }else
      mainWindow = null;

    return false;
  });
  
  mainWindow.on('minimize',function(event){
    event.preventDefault();
    mainWindow.hide();
  });

  ipc.on('hidewindows', function(event, data){
    event.preventDefault();
    mainWindow.hide();
  });

  ipc.on('setontop', function(event, data){
    mainWindow.setAlwaysOnTop(data);
  });

});
