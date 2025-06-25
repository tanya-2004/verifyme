const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let flaskProcess;

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  // Load the React build (adjust path as needed)
  win.loadFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
}

app.whenReady().then(() => {
  // Start Flask backend
  flaskProcess = spawn('python', ['backend/app.py'], {
    cwd: __dirname,
    shell: true,
    stdio: 'inherit'
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (flaskProcess) flaskProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});