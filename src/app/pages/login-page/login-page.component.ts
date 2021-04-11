import { Component, OnInit, OnDestroy } from '@angular/core';

// Angular Router for navigation
import { Router } from '@angular/router';

// Angular Reactive Forms
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
// RXJS Imports
import { Subscription } from 'rxjs';

// Models:
import { User } from 'src/app/models/user/user.model';

// Services:
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  // Form Group to contain User Data to Login
  loginForm: FormGroup = new FormGroup({});
  // AuthSubscription
  authSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });

    // ? To see the Login Form Values Change, We create a Listener
  }

  /**
   * Metodo de login
   */
  login(): void {
    if (
      this.loginForm.valid &&
      this.loginForm.value.email &&
      this.loginForm.value.password
    ) {
      let user: User = new User(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      this.authSubscription = this.authService.login(user).subscribe(
        (response) => {
          if (response.token) {
            this.snackBar.open(
              'Login realizado con exito',
              `Token: ${response.token}`,
              {
                duration: 2000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              }
            );
            sessionStorage.setItem('Token', response.token);
            localStorage.setItem('email', user.email);
            this.authService.setLoggedIn(true);
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          this.snackBar.open(
            'Fallo en el Login',
            'Error: ' + error.status + ' :  Introduce el usuario y el email correcto de https://reqres.in/api/login',
            {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
          this.authService.setLoggedIn(false);
          sessionStorage.removeItem('Token');
        }
      );
    } else {
      this.authService.setLoggedIn(false);
      this.snackBar.open('Error de el email y password', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
