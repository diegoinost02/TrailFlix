import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Popup, User } from 'src/app/core/Models';
import { UsersService } from 'src/app/core/services/users.service';
import { AlertPopupComponent } from 'src/app/shared/alert-popup/alert-popup.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {

  user: User = new User();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<SubscriptionComponent>, private usersService: UsersService, private router: Router, private formBuilder: FormBuilder, private dialog: MatDialog) { }

  formUser = this.formBuilder.group({
    'password': ['', Validators.required]
  })

  dataAlert: Popup = {
    title: 'No se pudo dar de baja',
    body: 'La contraseña ingresada no coindice con tu contraseña actual'
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const user = this.usersService.getCurrentUser();
    if (user) {
      user.subscribe((user: User[]) => {
        this.user = user[0];
      })
    }
  }

  dialogData = {
    title: 'Plan',
    span: 'Subscripción Activa',
    ocultVerification: true,
    disguiseButtonVerify: false,
    disguiseButtonSubmit: true
  };

  confirmation() {
    this.dialogData = {
      title: 'Confirmar',
      span: '¿Estas seguro de darte de baja?',
      ocultVerification: false,
      disguiseButtonVerify: true,
      disguiseButtonSubmit: false
    };
  }

  getPristine() {
    return this.formUser.get('password') as FormControl;
  }

  verifyPassword() {
    const password = this.formUser.value.password;
    if (password) {
      if (this.formUser.value.password === this.user.password) {
        this.deleteUser();
        this.dialogRef.close();
      }
      else {
        const dialogRef = this.dialog.open(AlertPopupComponent, {
          data: this.dataAlert, height: 'auto', width: '350px'
        })
        dialogRef.afterClosed().subscribe(result => {
        })
      }
    }
  }

  deleteUser() {
    this.usersService.deleteUser(this.user.id!).subscribe({
      next: () => {
        this.router.navigate([''])
      },
      error: () => {
        console.log("No se pudo eliminar el usuario")
      }
    })
  }
}