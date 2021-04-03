import { Component, OnInit } from '@angular/core';
// Services:
import { AuthService} from 'src/app/services/auth.service';

import { Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  email: string="";

  constructor( private router:Router,private authService: AuthService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
   this.email= JSON.stringify(localStorage.getItem('email'))

  }
logout(){

  this.snackBar.open("Ha Cerrado su Sesion correctamente","",{
    duration: 2000,
    horizontalPosition: "center",
    verticalPosition: "top",
   })


  localStorage.removeItem('username');
  this.authService.setLoggedIn(false);
  sessionStorage.removeItem('Token');
  this.router.navigate(['/login']);


}
}
