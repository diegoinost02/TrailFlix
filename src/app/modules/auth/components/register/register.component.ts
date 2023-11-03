import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: User = new User();
  constructor(private router: Router, private formBuilder: FormBuilder, private usersService: UsersService){}

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

  goToLogin(){
      this.router.navigate(['/auth/login']);
  }

  register(){
    if(this.formUser.valid){
      if(this.formUser.value.password === this.formUser.value.passwordConfirmation){

        this.cargarValores();
        this.checkAccount();
      }
      else{
        alert("Las contraseñas deben ser iguales")
        console.log("Contraseñas distinas"); //agregar logica
      }
    }
    else{
      alert("Debe completar todos los campos");
    }
  }

  cargarValores(){
    this.user.userName = this.formUser.value.name!;
    this.user.email = this.formUser.value.email!;
    this.user.password = this.formUser.value.password!;
  }

  checkAccount(){
    this.usersService.getToCheck(this.user).subscribe({

      next: (user: User[]) => {

        if(user.length > 0){

          alert("El mail ya esta en uso")
          console.log("User ya registrado")
        }
        else{
          this.createAccount(this.user);
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  createAccount(user:User){

    this.usersService.addUser(user).subscribe({

      next: (user: User) => {

        console.log("User creado")
        this.router.navigate(['/home'])
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }
}

