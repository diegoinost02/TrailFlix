import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { UsersService } from 'src/app/core/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionComponent } from '../subscription/subscription.component';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit{
  
  constructor(private usersService: UsersService, private router: Router, private dialog: MatDialog) { }

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
  editEmail(){
    this.router.navigate(['/profile/edit/email'])
  }
  editPassword(){
    this.router.navigate(['/profile/edit/password'])
  }
  subscriptionDate(){
    const dialogRef = this.dialog.open(SubscriptionComponent, { height: 'auto', width: '350px', backdropClass: "background-dialog" })
    dialogRef.afterClosed().subscribe(result => {
    })
  }

  logOut(){
    this.usersService.logout();
    this.router.navigate(['']);
  }
}
