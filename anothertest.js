var express = require('express');
var expressApp = express();
var path = require('path');

var http = require('http').Server(expressApp);
var io = require('socket.io')(http);



const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

let secondWin

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 })

  secondWin = new BrowserWindow({ width: 300, height: 200, frame: false })
  //secondWin.setIgnoreMouseEvents(true)
  //secondWin.setAlwaysOnTop(true, "floating");
  secondWin.loadFile('index.html')
  // Emitted when the window is closed.
  secondWin.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    secondWin = null
  })
  secondWin.webContents.openDevTools();

  // and load the index.html of the app.
  //win.loadFile('index.html')
  win.loadURL('http://localhost:3000')

  // Open the DevTools.
  win.webContents.openDevTools()

  
  win.setAlwaysOnTop(true, "floating");
  //win.hide();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})







expressApp.use(express.static(path.join(__dirname, 'brfv4_javascript_examples-master')));


// viewed at http://localhost:8080
expressApp.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + './brfv4_javascript_examples-master/index.html'));
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});



var myVar = setTimeout(myTimer, 75);
var canPrint = false;

function myTimer() {
  canPrint = true;
  clearTimeout(myVar);
}


var timeArr = [];
function getTime() {
  var totalTime = 0;
  for (var i = 1; i < timeArr.length; i++) {
    totalTime += timeArr[i] - timeArr[i - 1];
  }
  return totalTime;
}
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        if (msg == "no face found") {
          console.log(msg);
        }
        if (msg == "face found") {
          console.log(msg);
        }

        if (canPrint && msg != "face found" && msg != "no face found" && msg == "blink") {
            var date;
            date = +new Date();
            if (timeArr.length <= 4) {
              timeArr.push(date);
            }
            else {
              timeArr.push(date);
              timeArr.splice(0, 1)
            }
            console.log('message: ' + msg + " time: " + getTime() + "ms");

            secondWin.webContents.send('info' , {msg:'hello from main process'});

            //THIS PART CONTROLS SENSITIVITY (CHANGE 2000)
            if (getTime() < 2000 && timeArr.length == 5) {
                console.log("IT'S TIME TO CLOSE ALL THE WINDOWS!");

                var emergencyFile = require('./emergency.js');
                emergencyFile.emergency();

            }
        }
        canPrint = false;
        myVar = setTimeout(myTimer, 100);
    });
});
