import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { PageComponent } from './components/page/page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieSearchedComponent } from './components/movie-searched/movie-searched.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatDialogModule } from '@angular/material/dialog';
import { CategoriesComponent } from './components/categories/categories.component';



@NgModule({
  declarations: [
    PageComponent,
    MovieSearchedComponent,
    CategoriesComponent,
   
  
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    InfiniteScrollModule,
    MatDialogModule
  ]
})
export class SearchModule { }
