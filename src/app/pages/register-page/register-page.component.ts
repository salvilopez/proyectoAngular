import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user/user.model';
import {AuthService} from 'src/app/services/auth.service'
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({})
  authSubscription: Subscription = new Subscription();
  constructor(private formBuilder: FormBuilder, private router: Router, private auth : AuthService) { }

  ngOnInit(): void {
// password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$')])],
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }


  submitRegisterForm() {
    if(this.registerForm.valid&&this.registerForm.value.email&&this.registerForm.value.password){

      let user: User = new User(this.registerForm.value.email, this.registerForm.value.password)
      this.authSubscription = this.auth.register(user)
      .subscribe((response)=>{
        if(response.token){
        console.log(`Token: ${response.token}`);
        // Set Token in Session Storage of our Navigator
        sessionStorage.setItem('Token', response.token);

      //añadimos el nombre de usuario al local storage
        localStorage.setItem('username',user.email);
        this.router.navigate(['/login']);
      }

      },(error)=> {
        console.log('Error '+error.status+' Fallo en el registro, No llego el Token de respuesta' )

        alert('Error '+error.status+' Fallo en el registro, No llego el Token de respuesta' );
        sessionStorage.removeItem('Token');
      })


    } else {
      alert('Fallo en el registro , Algun campo invalido')
    }


  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
