import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.css']
})
export class EditEmailComponent  implements OnInit{

  constructor(private router: Router, private usersService: UsersService, private formBuilder: FormBuilder){}

  user: User = new User();

  formUser = this.formBuilder.group({
    'email': ['', Validators.required,Validators.email],
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
      else{
        alert("La contraseña no coincide");
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
