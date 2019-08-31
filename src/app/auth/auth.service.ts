import { Injectable } from '@angular/core';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { LoginPage } from './login/login.page';
import { AngularFireAuth } from  '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  userId: string;

  constructor( private router: Router, private afAuth: AngularFireAuth) { }

  registerUser(authData: AuthData) {
    this.afAuth.auth
       .createUserWithEmailAndPassword( authData.email, authData.password)
       .then(result =>{
        this.authSuccessfully();
       })
       .catch(error => {
         console.log(error);
       });
  //   this.user = {
  //     email: authData.email,
  //     userId: Math.round(Math.random() * 10000).toString()
  // };
  //  console.log(this.user);
 }
  
 login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword( authData.email, authData.password)
      .then(result =>{
        this.authSuccessfully();
    })
      .catch(error => {
        console.log(error);
    });
}

logout() {
  this.router.navigate(['/login']);
  this.isAuthenticated = false;
}

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.router.navigate(['/home']);
  }

}
