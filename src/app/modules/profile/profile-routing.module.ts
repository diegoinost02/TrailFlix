import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './components/page/page.component';
import { EditNameComponent } from './components/edit-name/edit-name.component';
import { EditEmailComponent } from './components/edit-email/edit-email.component';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';

const routes: Routes = [
  {
    path: '', component: PageComponent
  },
  {
    path: 'edit/name', component : EditNameComponent
  },
  {
    path: 'edit/email', component : EditEmailComponent
  },
  {
    path: 'edit/password', component : EditPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule{

}
