import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor( private formBuilder: FormBuilder, private router:Router){
  }

  formSearch = this.formBuilder.group({
    'search': ['',Validators.required],
  })

  goToSearch()
  {
    if(this.formSearch.valid)
    {
      const movie:string = this.formSearch.value.search!;
      this.router.navigate(['/search/', movie]);
    }
      
  }
}
