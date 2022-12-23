import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavPageComponent } from './pages/fav-page/fav-page.component';

const routes: Routes = [
  {
    path:'',
    component: FavPageComponent,
    // outlet:'fav-child' Usar en caso de tener varios router outlet
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
