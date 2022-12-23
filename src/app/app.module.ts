import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [ // Declaraciones componentes, directivas
    AppComponent
  ],
  imports: [ //Solo se importan otros modulos
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CookieService], //instalacion de cookies (provider)
  bootstrap: [AppComponent]
})
export class AppModule { }
