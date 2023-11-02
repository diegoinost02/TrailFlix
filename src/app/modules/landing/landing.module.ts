import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { PageComponent } from './components/page/page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';


@NgModule({
  declarations: [
    PageComponent,
    HeroComponent,
    FeaturesComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule
  ]
})
export class LandingModule { }
