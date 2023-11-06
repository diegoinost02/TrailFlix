import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { PageComponent } from './components/page/page.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';


@NgModule({
  declarations: [
    PageComponent,
    ViewProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { 
}
