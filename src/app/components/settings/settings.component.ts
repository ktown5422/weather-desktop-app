import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings() {
    this.settingsService.getSettings().then(settings => {

      const apiKeySetting = settings.find(s => s.key === 'apiKey');
      const apiUrlSetting = settings.find(s => s.key === 'apiUrl');

      if (apiKeySetting) {
        this.apiKey.value = apiKeySetting.value;
      }

      if (apiUrlSetting) {
        this.apiUrl.value = apiUrlSetting.value;
      }
    }).catch(error => {
      console.error('Error loading settings:', error);
    });
  }

  saveSetting(key: string, value: string) {
    if (!key || !value) {
      console.warn('Both key and value are required to update a setting.');
      return;
    }

    this.settingsService.updateSetting(key, value).then(() => {
      console.log(`Setting updated: ${key} = ${value}`);
      this.loadSettings();
    }).catch(error => {
      console.error('Error updating setting:', error);
    });
  }
}