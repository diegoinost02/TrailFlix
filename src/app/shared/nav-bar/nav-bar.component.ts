import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor( private formBuilder: FormBuilder, private router:Router){
  }
  ngOnInit(): void {
  }

  formSearch = this.formBuilder.group({
    'search': ['',Validators.required],
  })

  goToSearch()
  {
    if(this.formSearch.valid)
    {
      let movie:string = this.formSearch.value.search!;

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['/search',movie]));
    }
      
  }


}
