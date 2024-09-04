import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { WeatherComponent } from './components/weather/weather.component';

export const routes: Routes = [
    { path: '', title: 'Home', component: HomeComponent },
    { path: 'home', title: 'Home', component: HomeComponent },
    { path: 'settings', title: 'Settings', component: SettingsComponent },
    { path: 'login', title: 'Login', component: LoginComponent },
    { path: 'weather', title: 'Weather', component: WeatherComponent },
];
