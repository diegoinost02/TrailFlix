import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router: Router, private formBuilder: FormBuilder){}

  formUser = this.formBuilder.group({
    'name': ['',Validators.required],
    'email': ['', Validators.required], //,Validators.email],
    'password': ['', Validators.required],
    'passwordConfirmation': ['', Validators.required],
    'conditions': ['', Validators.required]
  })

  get getName() {
    return this.formUser.get('name') as FormControl;
  }
  get getEmail() {
    return this.formUser.get('email') as FormControl;
  }
  get getPassword() {
    return this.formUser.get('password') as FormControl;
  }
  get getPasswordConfirmation() {
    return this.formUser.get('passwordConfirmation') as FormControl;
  }
  get getConditions() {
    return this.formUser.get('conditions') as FormControl;
  }

}
