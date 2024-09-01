const { contextBridge, ipcRenderer } = require('electron');

// Securely expose limited APIs to the renderer process (Angular)
contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
        on: (channel, listener) => ipcRenderer.on(channel, listener)
    }
});
