import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TracksPageComponent } from './pages/tracks-page/tracks-page.component';

const routes: Routes = [
  {
    path:'',
    component: TracksPageComponent
    //outlet:'child' //indicar el nombre del outlet porque sino solamente cargará el primer módulo de jerarquia superior en este caso raiz app.component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TracksRoutingModule { }
