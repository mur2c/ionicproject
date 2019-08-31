import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  formvalid = false;
  submitted = false;

  constructor( private authService: AuthService) { }    //Injected service need to be imported in app.module.ts

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.submitted = true;

    if (!form.valid) {
      this.formvalid = true;
    }
   // Call register Method and pass signup data
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}

