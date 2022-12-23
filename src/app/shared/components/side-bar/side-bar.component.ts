import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrackService } from '@modules/tracks/services/track.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  mainMenu: {
    defaultOptions: Array<any>, accessLink: Array<any>
  } = {defaultOptions:[], accessLink:[]}
  customOptions: Array<any> = [];
  constructor(private router: Router, private _trackService: TrackService){} 
  ngOnInit(): void{
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'uil uil-estate',
        router: ['/', '']  //
      },
      {
        name:'Buscar',
        icon: 'uil uil-search',
        router: ['/', 'history'] //app.com/history
      },
      {
        name:'Tu Biblioteca',
        icon:'uil uil-chart',
        router:['/', 'favorites']
      }
    ]
    this.mainMenu.accessLink = [
      {
        name: 'Crear lista',
        icon: 'uil-plus-square'
      },
      {
        name:'Canciones que te gustan',
        icon:'uil-heart-medical'
      }
    ]
    this.customOptions = [
      {
        name:'Mi lista N°1',
        router: ['/']
      },
      {
        name:'Mi lista N°2',
        router: ['/']
      },
      {
        name:'Mi lista N°3',
        router:['/']
      }
    ]

    // SERVICIO suscribirnos RXJS programacion reactiva
    // this._trackService.dataTracksRandom$.subscribe(response =>{
    //   this.customOptions.push(
    //     {
    //       name: response[0].name,
    //       router:[]
    //     }
    //   )
    // })
  }
  //funcion para direccionar (necesita definir en constructor)
  goTo($event: any): void{
    this.router.navigate(['/','favorites'], {
      queryParams:{
        key1:'value1',
        key2:'value2',
        key3:'value3'
      }
    })
    console.log($event)
    //existen dos URL paramentros /asdasds/asdasd
    //            URL query params /asss/param1?valor1&param2?valor2
  }
}
