import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.component.html',
  styleUrls: ['./edit-name.component.css']
})
export class EditNameComponent implements OnInit{

  constructor(private router: Router, private usersService: UsersService, private formBuilder: FormBuilder){}

  user: User = new User();

  formUser = this.formBuilder.group({
    'name': ['', Validators.required,],
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

  get getName() {
    return this.formUser.get('name') as FormControl;
  }
  get getPassword() {
    return this.formUser.get('password') as FormControl;
  }

  editName(){
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
    this.user.userName = this.formUser.value.name!;
    this.usersService.editUser(this.user.id!, this.user).subscribe({
      next: () => {
        console.log("Nombre actualizado");
        this.router.navigate(['/profile'])
      },
      error: (error) => alert(error)
    })
  }

  comeToViewProfile(){
    this.router.navigate(['/profile'])
  }

}
