import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit{

  constructor(private router: Router, private usersService: UsersService, private formBuilder: FormBuilder){}

  user: User = new User();

  formUser = this.formBuilder.group({
    'newPassword': ['', Validators.required],
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

  editPassword(){
    if(this.formUser.valid){

      if(this.formUser.value.password === this.user.password){
        this.updateUser();
      }
      else{
        alert("La contraseña no coincide");
      }
    }
  }

  updateUser(){
    this.user.password = this.formUser.value.newPassword!;
    this.usersService.editUser(this.user.id!, this.user).subscribe({
      next: () => {
        console.log("Contraseña actualizada");
        this.router.navigate(['/profile'])
      },
      error: (error) => alert(error)
    })
  }

  comeToViewProfile(){
    this.router.navigate(['/profile'])
  }

}
