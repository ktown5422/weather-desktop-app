import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  apiKey = { key: 'apiKey', value: '' };
  apiUrl = { key: 'apiUrl', value: '' };
  error: string | null = null;

  constructor() { }

  ngOnInit(): void {
    this.loadApiSettings();
  }

  async loadApiSettings(): Promise<void> {
    try {
      const settings = await window.electron.ipcRenderer.invoke('get-settings');
      this.apiKey.value = settings['apiKey'] || '';
      this.apiUrl.value = settings['apiUrl'] || '';

      if (!this.apiKey.value || !this.apiUrl.value) {
        this.error = 'API Key or URL not found in settings.';
      } else {
        this.error = null;
      }
    } catch (error) {
      console.error('Error fetching API settings:', error);
      this.error = 'Failed to load API settings.';
    }
  }

  saveSetting(key: string, value: string): void {
    if (!key || !value) {
      console.warn('Both key and value are required to update a setting.');
      return;
    }

    window.electron.ipcRenderer.invoke('update-setting', { key, value })
      .then(() => {
        console.log(`Setting updated: ${key} = ${value}`);
        this.loadApiSettings();
      })
      .catch(error => {
        console.error('Error updating setting:', error);
      });
  }
}
