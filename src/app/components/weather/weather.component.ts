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

  constructor() { }

  ngOnInit(): void { }

  async getWeatherData(): Promise<void> {
    if (!this.city) {
      this.error = 'Please enter or select a city.';
      return;
    }

    const accessKey = '3da21353f0c8ebc4143e72ef3e344209';
    const apiUrl = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${this.city}`;

    try {
      const response = await axios.get(apiUrl);
      this.weatherData = response.data;
      console.log(this.weatherData);
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