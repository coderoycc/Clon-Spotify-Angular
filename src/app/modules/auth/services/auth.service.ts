import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { environmet } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly URL = environmet.api
  constructor(private http: HttpClient, private cookie: CookieService) { }

  sendCredentials(email: string, password: string): Observable<any>{
    //para que funcione todo observable se necesita suscripcion
    const body = {
      email:email, //test@test.com
      password:password //1-8
    }
    return this.http.post(`${this.URL}/auth/login`, body)
    .pipe(
      tap((responseOK:any) =>{
        const { tokenSession, data} = responseOK
        this.cookie.set('token_servicio', tokenSession, 2, '/')
      })
    )
  }
}
