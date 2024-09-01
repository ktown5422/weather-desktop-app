import { Injectable } from '@angular/core';

declare global {
    interface Window {
        electron: {
            ipcRenderer: {
                invoke(channel: string, ...args: any[]): Promise<any>;
                on(channel: string, listener: (event: any, ...args: any[]) => void): void;
            };
        };
    }
}

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    constructor() { }

    async getSettings(): Promise<any[]> {
        return window.electron.ipcRenderer.invoke('get-settings')
            .catch((error) => {
                console.error('Error fetching settings:', error);
                throw error;
            });
    }

    async updateSetting(key: string, value: string): Promise<any> {
        return window.electron.ipcRenderer.invoke('update-setting', { key, value })
            .catch((error) => {
                console.error('Error updating setting:', error);
                throw error;
            });
    }
}



