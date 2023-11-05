import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  public user: User = new User();

  constructor(private router: Router, private formBuilder: FormBuilder, private usersService:UsersService) { }

  formUser = this.formBuilder.group({
    'email': ['', Validators.required], //,Validators.email],
    'password': ['', Validators.required]
  })

  get getEmail() {
    return this.formUser.get('email') as FormControl;
  }
  get getPassword() {
    return this.formUser.get('password') as FormControl;
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  async login(){
    if(this.formUser.valid){
      await this.cargarValores();
      this.verificar();
    }
    else{
      alert("Debe completar todos los campos");
    }
  }

  cargarValores(){
    this.user.email = this.formUser.value.email!;
    this.user.password = this.formUser.value.password!;
  }

  verificar(){
    this.usersService.getUserToAuth(this.user).subscribe({

      next: (users:User[]) =>{
        if (users.length > 0) {
          console.log("User verificado");

          const token = this.usersService.generateToken(users[0]);
          this.usersService.setCurrentUser(token);

          this.router.navigate(["/home"]);
        }
        else {
          console.log("User no verificado");
          alert("Email o contraseña incorrectos")
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }
}
