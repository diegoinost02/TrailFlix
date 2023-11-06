import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './components/page/page.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { MovieGridComponent } from './components/movie-grid/movie-grid.component';

const routes: Routes = [

  {
    path: '',component: PageComponent
  },
  {
    path: 'movies', component: MovieGridComponent
  },
  {
    path: 'profile', component: ViewProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
