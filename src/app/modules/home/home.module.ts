import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomeRoutingModule } from './home-routing.module';
import{MatDialogModule} from '@angular/material/dialog'

import { PageComponent } from './components/page/page.component';
import { MovieGridComponent } from './components/movie-grid/movie-grid.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieTrailerComponent } from './components/movie-trailer/movie-trailer.component';




@NgModule({
  declarations: [
    PageComponent,
    MovieGridComponent,
    MovieDetailsComponent,
    MovieTrailerComponent,
   
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    InfiniteScrollModule,
    MatDialogModule,
  ]
})
export class HomeModule { }
