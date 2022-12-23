import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

const routes: Routes = [
  {
    path:'',
    component:AuthPageComponent
  },
  {
    path:'login',
    component:AuthPageComponent
  },
  {
    path: '**', //para cualquier valor que no exista
    redirectTo: 'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
