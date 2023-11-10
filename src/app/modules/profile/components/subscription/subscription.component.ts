import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {

  user: User = new User();

  constructor(@Inject(MAT_DIALOG_DATA)public data: any, private dialogRef: MatDialogRef<SubscriptionComponent>, private usersService: UsersService, private router: Router) { }

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
    button: 'Dar de baja',
    onClick: () => this.confirmation(),
  };

  confirmation(){
    this.dialogData = {
      title: 'Confirmar',
      span: '¿Estas seguro de darte de baja?',
      button: 'Dar de baja',
      onClick: () => this.deleteUser(),
    };
  }

  deleteUser(){
    this.usersService.deleteUser(this.user.id!).subscribe({
      next: () =>{
        this.router.navigate([''])
      },
      error: () => {
        console.log("No se pudo eliminar el usuario")
      }
    })
  }
}