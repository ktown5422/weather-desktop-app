import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router, private location: Location, private authService: AuthService) { }


  onSettingsClick(): void {
    this.router.navigate(['/settings']);
  }

  onLoginClick(): void {
    this.router.navigate(['/login']);
  }

  onBackClick(): void {
    this.location.back();
  }
}
