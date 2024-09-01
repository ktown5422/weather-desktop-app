import { Component } from '@angular/core';
import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [WeatherComponent],
  standalone: true
})
export class HomeComponent {

}

