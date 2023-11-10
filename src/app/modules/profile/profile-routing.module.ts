import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './components/page/page.component';
import { EditNameComponent } from './components/edit-name/edit-name.component';

const routes: Routes = [
  {
    path: '', component: PageComponent
  },
  {
    path: 'edit/name', component : EditNameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule{

}
