import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Popup, User } from 'src/app/core/Models';
import { UsersService } from 'src/app/core/services/users.service';
import { AlertPopupComponent } from 'src/app/shared/alert-popup/alert-popup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  public user: User = new User();

  dataAlertVerify: Popup = {
    title: 'No se pudo iniciar sesión',
    body: 'Debe completar todos los campos'
  }
  dataAlertAuth: Popup = {
    title: 'No se pudo iniciar sesión',
    body: 'Usuario o contraseña incorrectos'
  }

  constructor(private router: Router, private formBuilder: FormBuilder, private usersService:UsersService, private dialog: MatDialog) { }

  formUser = this.formBuilder.group({
    'email': ['', Validators.required,],//Validators.email],
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

  async verify(){
    if(this.formUser.valid){
      await this.cargarValores();
      this.login();
    }
    else {
      const dialogRef = this.dialog.open(AlertPopupComponent, {
        data: this.dataAlertVerify, height: 'auto', width: '350px',
        backdropClass: "background-dialog"
      })
      dialogRef.afterClosed().subscribe(result => {
      })
    }
  }

  cargarValores(){
    this.user.email = this.formUser.value.email!;
    this.user.password = this.formUser.value.password!;
  }

  login(){
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
          const dialogRef = this.dialog.open(AlertPopupComponent, {
            data: this.dataAlertAuth, height: 'auto', width: '350px',
            backdropClass: "background-dialog"
          })
          dialogRef.afterClosed().subscribe(result => {
          })
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }
}
