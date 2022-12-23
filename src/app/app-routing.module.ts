import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from '@core/guards/session.guard';
import { HomePageComponent } from '@modules/home/pages/home-page/home-page.component';

/*NIVEL RAIZ COMPLETO */
const routes: Routes = [ //indica las rutas y los componentes (Modulos)
// Se usan módulos por el lazyload para cargar por fragmentos
  {
    path: 'auth',
    loadChildren: () => import(`./modules/auth/auth.module`).then(a => a.AuthModule)
  },
  {
    path: '', //TODO: localhost:4200/ <-- /
    //component ... (aplicaciones pequeñas)
    component: HomePageComponent,
    loadChildren: () => import(`./modules/home/home.module`).then(m => m.HomeModule), //cargamos solo un modulo (no toda la app) para que este modulo a se vez carge solo sus componentes 
    canActivate:[SessionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
