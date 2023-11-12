import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit{

  public user: User = new User();

  /// Creo los datos de las diferentes alertas para invocar a el componente Popup y que sea reutilizable
  dataAlertVerify: Popup = {
    title: 'No se pudo iniciar sesión',
    body: 'Debe completar todos los campos'
  }
  dataAlertAuth: Popup = {
    title: 'No se pudo iniciar sesión',
    body: 'Usuario o contraseña incorrectos'
  }

  constructor(private router: Router, private formBuilder: FormBuilder, private usersService:UsersService, private dialog: MatDialog) {}

  /// Llama a verificar si el user esta logueado
  ngOnInit(): void {
    this.verifyUser();
  }
  /// Verificar si el user ya esta logueado, de ser asi se redirige al home
  verifyUser() {
    const user = this.usersService.getCurrentUser();
    if (user) {
      console.log("logueado")
      this.router.navigate(['/home'])
    }
    else{
      console.log("No logueado")
    }
  }

  // Defino los controles del formulario
  formUser = this.formBuilder.group({
    'email': ['', Validators.required,],//Validators.email],
    'password': ['', Validators.required]
  })

  // Getters para poder acceder a las propiedades de los atributos del formulario
  get getEmail() {
    return this.formUser.get('email') as FormControl;
  }
  get getPassword() {
    return this.formUser.get('password') as FormControl;
  }

  // Función para el boton de ir al componente Register
  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  /* Verifico si el formulario es valido, de ser asi invoco las funciones necesarias para loguearse,
  De lo contrario muestro la alerta de "Completar todos los campos" */
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

  // Si el formulario es valido, cargo los valores del mismo en la instancia User del componente
  cargarValores(){
    this.user.email = this.formUser.value.email!;
    this.user.password = this.formUser.value.password!;
  }

  /* Llamo la función para autenticarse del servicio usersService. Si encuentra el usuario se logua y cargo el token de autenticación,
  De no encontrarse el usuario, muestro la alerta de "Usuario/Contraseña incorrectos" */
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
