import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit{

  
  constructor(private usersService: UsersService, private router: Router) { }

  user: User = new User();
  markedPassword: string = '';
  subscription: boolean = false;

   ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const user = this.usersService.getCurrentUser();
    if (user) {
      user.subscribe((user: User[]) => {
        this.user = user[0];
        this.markedPassword = '*'.repeat(this.user.password.length)
        console.log("user del token:" + JSON.stringify(this.user))
      })
    }
  }

  editUserName(){
    this.router.navigate(['/profile/edit/name'])
  }
  editEmail(){}
  editPassword(){}
  subscriptionDate(){}

  logOut(){
    this.usersService.logout();
    this.router.navigate(['']);
  }
}
