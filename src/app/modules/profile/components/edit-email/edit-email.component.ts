import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Popup, User } from 'src/app/core/Models';
import { UsersService } from 'src/app/core/services/users.service';
import { AlertPopupComponent } from 'src/app/shared/alert-popup/alert-popup.component';

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.css']
})
export class EditEmailComponent  implements OnInit{

  constructor(private router: Router, private usersService: UsersService, private formBuilder: FormBuilder,  private dialog: MatDialog){}

  user: User = new User();

  dataAlert: Popup = {
    title: 'No se pudo actualizar',
    body: 'La contraseña ingresada no coindice con tu contraseña actual'
    }

  formUser = this.formBuilder.group({
    'email': ['', Validators.required], //,Validators.email],
    'password': ['', Validators.required]
  })

  ngOnInit(): void {
      this.loadData();
  }
  loadData(){
    const user = this.usersService.getCurrentUser();
    if(user){
      user.subscribe((user: User[]) => {
        this.user = user[0];
      })
    }
  }

  editEmail(){
    if(this.formUser.valid){

      if(this.formUser.value.password === this.user.password){
        this.updateUser();
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
  
  updateUser(){
    this.user.email = this.formUser.value.email!;
    this.usersService.editUser(this.user.id!, this.user).subscribe({
      next: () => {
        console.log("Email actualizado");
        this.router.navigate(['/profile'])
      },
      error: (error) => alert(error)
    })
  }

  comeToViewProfile(){
    this.router.navigate(['/profile'])
  }
}
