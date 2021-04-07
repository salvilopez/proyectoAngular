import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private router:Router,private authService: AuthService,private snackBar: MatSnackBar) { }
  @Input() logueado:boolean=false;
  index:number=0;


  ngOnInit(): void {

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
