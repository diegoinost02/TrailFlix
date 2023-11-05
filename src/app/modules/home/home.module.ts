import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PageComponent } from './components/page/page.component';
import { MovieGridComponent } from './components/movie-grid/movie-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    PageComponent,
    MovieGridComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    InfiniteScrollModule

  ]
})
export class HomeModule { }
