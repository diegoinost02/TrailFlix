import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Popup, User } from 'src/app/core/Models';
import { UsersService } from 'src/app/core/services/users.service';
import { AlertPopupComponent } from 'src/app/shared/alert-popup/alert-popup.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: User = new User();

  dataAlertPassword: Popup = {
    title: 'No se pudo registrar',
    body: 'Las contraseñas deben ser iguales'
  }
  dataAlertVerify: Popup = {
    title: 'No se pudo registrar',
    body: 'Debe completar todos los campos'
  }
  dataAlertCheck: Popup = {
    title: 'No se pudo registrar',
    body: 'El mail ya esta en uso'
  }

  constructor(private router: Router, private formBuilder: FormBuilder, private usersService: UsersService, private dialog: MatDialog) { }

  formUser = this.formBuilder.group({
    'name': ['', Validators.required],
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

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  register() {
    if (this.formUser.valid) {
      if (this.formUser.value.password === this.formUser.value.passwordConfirmation) {

        this.cargarValores();
        this.checkAccount();
      }
      else {
        const dialogRef = this.dialog.open(AlertPopupComponent, {
          data: this.dataAlertPassword, height: 'auto', width: '350px'
        })
        dialogRef.afterClosed().subscribe(result => {
        })
        console.log("Contraseñas distinas"); //agregar logica
      }
    }
    else {
      const dialogRef = this.dialog.open(AlertPopupComponent, {
        data: this.dataAlertVerify, height: 'auto', width: '350px'
      })
      dialogRef.afterClosed().subscribe(result => {
      })
    }
  }

  cargarValores() {
    this.user.userName = this.formUser.value.name!;
    this.user.email = this.formUser.value.email!;
    this.user.password = this.formUser.value.password!;
    this.user.isSubscribed = true;
  }

  checkAccount() {
    this.usersService.getToCheck(this.user).subscribe({

      next: (user: User[]) => {

        if (user.length > 0) {

          const dialogRef = this.dialog.open(AlertPopupComponent, {
            data: this.dataAlertCheck, height: 'auto', width: '350px'
          })
          dialogRef.afterClosed().subscribe(result => {
          })
          console.log("User ya registrado")
        }
        else {
          this.createAccount(this.user);
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  createAccount(user: User) {

    this.usersService.addUser(user).subscribe({

      next: () => {
        this.login()
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  login() {
    this.usersService.getUserToAuth(this.user).subscribe({

      next: (users: User[]) => {
        if (users.length > 0) {
          console.log("User verificado");

          const token = this.usersService.generateToken(users[0]);
          this.usersService.setCurrentUser(token);

          this.router.navigate(["/home"]);
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }
}

