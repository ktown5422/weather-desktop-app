import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router, private location: Location) { }


  onSettingsClick(): void {
    // Navigate to the settings page
    this.router.navigate(['/settings']);
  }

  onLoginClick(): void {
    // Navigate to the login page
    this.router.navigate(['/login']);
  }

  onBackClick(): void {
    this.location.back();
  }
}
