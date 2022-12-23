import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavPageComponent } from './pages/fav-page/fav-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    FavPageComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedModule
  ]
})
export class FavoritesModule { }
