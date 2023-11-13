import { Component, OnInit } from '@angular/core';
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
export class RegisterComponent implements OnInit{

  user: User = new User();

   /// Creo los datos de las diferentes alertas para invocar a el componente Popup y que sea reutilizable
  dataAlertConditions: Popup = {
    title: 'Términos y condiciones',
    body:
    `La Aplicación es un trabajo universitario realizado por Juan Manuel Tretta Alvo y Diego Ezequiel Inostroza. Para acceder el Usuario deberá crear una cuenta de usuario y proporcionar los siguientes datos:
    -Nombre de usuario
    -Dirección de correo electrónico
    -Contraseña
    
    El Usuario podrá utilizar la Aplicación para:
    -Ver trailers
    -Buscar peliculas
    -Añadir peliculas a favoritos
    
    Los derechos de propiedad intelectual sobre la aplicación, incluidos los códigos fuente y los contenidos, son de propiedad de Juan Manuel Tretta Alvo y Diego Ezequiel Inostroza. La aplicación se distribuye bajo una licencia de código abierto, lo que permite a los usuarios descargar, modificar y redistribuir el código fuente, pero no permite a los usuarios reclamar la propiedad de la aplicación.
    
    La aplicación está destinada exclusivamente para uso personal y no comercial. Los usuarios no están autorizados a emplear la aplicación con propósitos comerciales o lucrativos, ya que esta ha sido desarrollada como parte de un proyecto universitario.`
    }

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

  constructor(private router: Router, private formBuilder: FormBuilder, private usersService: UsersService, private dialog: MatDialog) {}

  ///al inicializar llama a verifyUser
  ngOnInit(): void {
    this.verifyUser();
  }
  ///verifica si el user esta autenticado, de ser asi se redirige al home
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
    'name': ['', Validators.required],
    'email': ['', Validators.required], //,Validators.email],
    'password': ['', Validators.required],
    'passwordConfirmation': ['', Validators.required],
    'conditions': ['', Validators.required]
  })

    // Getters para poder acceder a las propiedades de los atributos del formulario
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

  // Función para el boton de ir al componente Login
  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  // Función para abrir los terminos y condiciones en forma de popup
  openConditions(){
    const dialogRef = this.dialog.open(AlertPopupComponent, {
      data: this.dataAlertConditions, height: 'auto', width: 'auto',
      backdropClass: "background-dialog"
    })
    dialogRef.afterClosed().subscribe(result => {
    })
  }

    /* Verifico si el formulario es valido, de ser asi invoco las funciones necesarias para registrarse,
  De lo contrario muestro la alerta de "Completar todos los campos" */
  verify() {
    if (this.formUser.valid) {
      if (this.formUser.value.password === this.formUser.value.passwordConfirmation) {

        this.cargarValores();
        this.checkAccount();
      }
      else {
        const dialogRef = this.dialog.open(AlertPopupComponent, {
          data: this.dataAlertPassword, height: 'auto', width: '350px',
          backdropClass: "background-dialog"
        })
        dialogRef.afterClosed().subscribe(result => {
        })
        console.log("Contraseñas distinas");
      }
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
  cargarValores() {
    this.user.userName = this.formUser.value.name!;
    this.user.email = this.formUser.value.email!;
    this.user.password = this.formUser.value.password!;
    this.user.isSubscribed = true;
  }

  /* Verifico que no exista un usuario registrado con el mismo Mail,
  de ser asi llamo a la funcion para crear la cuenta, de lo contrario muestro una alerte*/
  checkAccount() {
    this.usersService.getToCheck(this.user).subscribe({

      next: (user: User[]) => {

        if (user.length > 0) {

          const dialogRef = this.dialog.open(AlertPopupComponent, {
            data: this.dataAlertCheck, height: 'auto', width: '350px',
            backdropClass: "background-dialog"
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

  // Registro la nueva cuenta en el archivo JSON que sera consumido por JsonServer
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

  // Genero un token de autenticación y hago el respectivo logueo de la nueva cuenta registrada
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

