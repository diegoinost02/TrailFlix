import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit{
  
  constructor(private usersService: UsersService, private router: Router){}


  ngOnInit(): void {
    this.verifyUser();
  }

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
}
