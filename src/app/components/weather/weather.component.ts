import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  city: string = 'New York';
  cityOptions: string[] = [
    'New York', 'London', 'Tokyo', 'Sydney', 'Paris', 'Berlin', 'Moscow',
    'Beijing', 'Mumbai', 'Cairo', 'Rio de Janeiro', 'Los Angeles', 'Chicago',
    'Toronto', 'Madrid', 'Rome', 'Dubai', 'Bangkok', 'Seoul', 'Hong Kong'
  ];
  weatherData: any;
  error: string | null = null;
  apiKey: string = '';
  apiUrl: string = '';

  constructor() { }

  ngOnInit(): void {
    this.loadApiSettings();
  }

  async loadApiSettings(): Promise<void> {
    try {
      const settings = await window.electron.ipcRenderer.invoke('get-settings');
      this.apiKey = settings['apiKey'] || '';
      this.apiUrl = settings['apiUrl'] || '';

      if (!this.apiKey || !this.apiUrl) {
        this.error = 'API Key or URL not found in settings.';
      }
    } catch (error) {
      console.error('Error fetching API settings:', error);
      this.error = 'Failed to load API settings.';
    }
  }

  async getWeatherData(): Promise<void> {
    if (!this.city) {
      this.error = 'Please enter or select a city.';
      return;
    }

    if (!this.apiKey || !this.apiUrl) {
      this.error = 'API Key or URL is missing.';
      return;
    }

    const apiUrl = `${this.apiUrl}?access_key=${this.apiKey}&query=${this.city}`;

    try {
      const response = await axios.get(apiUrl);
      this.weatherData = response.data;
      this.error = null;
    } catch (error) {
      this.error = 'Unable to fetch weather data. Please try again later.';
      console.error(error);
    }
  }

  convertToFahrenheit(celsius: number): number {
    return (celsius * 9 / 5) + 32;
  }
}
