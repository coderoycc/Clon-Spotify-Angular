import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  formLogin: FormGroup = new FormGroup({}) //Bloque de formulario
  errorSession: boolean = false;

  constructor(private _authService: AuthService, private cookie: CookieService, private router: Router){
    //inyectamos el servicio en el constructor
    //inyectamos provider cookie
  }
  ngOnInit(): void{
    this.formLogin = new FormGroup(
      {
        email: new FormControl('',[
          Validators.required,
          Validators.email
        ]), //Elemento del bloque de formulario
        password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(4)
        ])
      }
    )
    //Para validar el formulario formLogin.valid
  }

  sendLogin(): void{
    const {email, password} = this.formLogin.value
    this._authService.sendCredentials(email,password)
    .subscribe(responseOk => { //credencial correcto
      console.log('Session OK')
      const { tokenSession, data} = responseOk
      this.cookie.set('token', tokenSession, 4, '/')
      //        nombre, tokenGenerado, N dias, rutas de permiso
      this.router.navigate(['/', 'home'])
    }, err =>{ //errores
      console.log("Error credenciales")
      this.errorSession = true
    })
  }
}
