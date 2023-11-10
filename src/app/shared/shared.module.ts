import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';
import { RouterModule } from '@angular/router';
import { AlertPopupComponent } from './alert-popup/alert-popup.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    ErrorComponent,
    AlertPopupComponent
   
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    ErrorComponent
  ]
})
export class SharedModule { }
