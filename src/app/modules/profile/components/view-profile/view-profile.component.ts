import { Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/core/Models';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit{

  constructor(private usersService: UsersService) { }

  user: User = new User();

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    const user = this.usersService.getCurrentUser();
    if (user) {
      user.subscribe((user: User[]) => {
        this.user = user[0];
        console.log("user del token:" + JSON.stringify(this.user))
      })
    }
  }
}
/*
loadUser2() {
  const user = this.usersService.getCurrentUser()?.subscribe({
    next: (users: User[]) => {
      if (users && users.length > 0) {
        this.user = users[0];
        console.log(this.user)
      }else {
        alert("Error, verifique mail y contraseña");
      }
    },
    error: (error: any) => {
      console.error("Error");
    }
  });
}
*/
