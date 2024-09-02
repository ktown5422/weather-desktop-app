const { app, BrowserWindow, ipcMain } = require('electron');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const url = require("url");
const dbPath = path.join(__dirname, 'mydatabase.db');

let mainWindow;

let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS settings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key TEXT UNIQUE NOT NULL,
            value TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating settings table:', err.message);
            } else {
                console.log('Settings table is ready.');
            }
        });
    }
});

ipcMain.handle('get-settings', async () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT key, value FROM settings WHERE key IN ("apiKey", "apiUrl")', [], (err, rows) => {
            if (err) {
                console.error('Error fetching settings:', err.message);
                reject(err);
            } else {
                console.log('Fetched settings');
                const settings = rows.reduce((acc, row) => {
                    acc[row.key] = row.value;
                    return acc;
                }, {});
                resolve(settings);
            }
        });
    });
});

ipcMain.handle('update-setting', async (event, setting) => {
    const { key, value } = setting;
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO settings (key, value) VALUES (?, ?) 
                ON CONFLICT(key) DO UPDATE SET value=excluded.value`, [key, value], function (err) {
            if (err) {
                console.error('Error updating setting:', err.message);
                reject(err);
            } else {
                console.log('Setting updated');
                resolve({ success: true });
            }
        });
    });
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false
        }
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/weather-desktop-app/browser/index.html`),
            protocol: "file:",
            slashes: true
        })
    );

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});
