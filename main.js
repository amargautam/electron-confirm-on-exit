// Modules to control application life and create native browser window
const {app, BrowserWindow, dialog} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// This function shows a dialoge box to confirm
// the user to quit the app. If the user confirms
// to quit, it gracefully passes before-quit event
// to will-quit. If the user choses to not quit,
// it prevents the exit of the app and keeps the window active.
//
// Note: On macOS, this only works when the user does Cmd+Q or Menu > Quit
function confirmAndQuit(e) {
  // dialog options
  const messageBoxOptions = {
    type: 'question',
    buttons: ['Cancel', 'Quit'],
    title: 'This will quit the app',
    message: 'Are you sure to quit?',
  };
  //show the dialog
  dialog.showMessageBox(null, messageBoxOptions, response => {
    // If user chooses to not exit
    if(response == 0) {
      // Prevents the exit and keeps the window active
      e.preventDefault();
    } else {
      // If the user choses to quit, do nothing. 
      // will-quit event will trigger to be handled differently
      app.quit()
    }
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', function (e) {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  confirmAndQuit(e)
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
