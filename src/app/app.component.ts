import { Component, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements DoCheck {
  title = 'angular-contacts';
  logueado:boolean=false;
  index:number=0;
  constructor(private authService: AuthService) { }
  ngDoCheck() {
    this.logueado= this.authService.loggedIn;
  }
}
