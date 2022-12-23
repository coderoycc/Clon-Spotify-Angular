import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  //establecemos las rutas con los componentes
  // {
  //   path: '', //carga en la raiz
  //   // tambien si el modulo en app-routing.module.ts tiene otra ruta  tambien se cambia aqui 
  //   //path: 'dashboard' --> app.com/>raiz</dashboard
  //   //path: 'home/:parametro1/:parametro2' --> parametros dentro de home (pueden existir o no) 
  //   component: HomePageComponent
  // }
  /*Necesitamos un componente que se destruya para dar paso a otros y usamos el Home para rutear las demas vistas componentes*/
  {
    path:'tracks',
    loadChildren: () => import('@modules/tracks/tracks.module').then(t => t.TracksModule)
  },
  {
    path:'history',
    loadChildren: () => import('@modules/history/history.module').then(h => h.HistoryModule)
  },
  {
    path:'favorites',
    loadChildren: () => import('@modules/favorites/favorites.module').then(f => f.FavoritesModule)
  },
  {
    path:'**', //Para 404 cuando no se encuentra la página
    redirectTo: '/tracks'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
