import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs'; //programacion reactiva

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnDestroy{
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')
  //ViewChild se utiliza para extraer etiquetas con identificador '#'
  public mockCover!: TrackModel;
  listObservers$: Subscription[] = []
  state: string = 'paused'

  //Inyectar el servicio al constructor
  constructor(public _multimediaService: MultimediaService){}

  ngOnInit(): void{
    // const observer1$:Subscription = this._multimediaService.callback.subscribe(
    //   (response: TrackModel) => {
    //     console.log('Recibiendo cancion', response)
    //   } //subscribe para atender la respuesta
    // )
    // const observable2 = this._multimediaService.myObservable1$.subscribe(
    //   (responseOK)=>{
    //     //Correcto
    //     console.log("LLEGA NORMAL", responseOK)
    //   },
    //   (responseFail)=>{
    //     //Error
    //     console.log("TUBERIIA ABERIADA", responseFail)
    //   }
    // )
    //Grifos para recibir el flujo de datos 

    // this.listObservers$ = [observer1$] //por si existen mas suscripciones
    
    // this._multimediaService.trackInfo$.subscribe(res => {
    //   console.log("debo reproducir esta cancion... ", res)
    //   //se dispara desde card-player
    // })
    const observer1$ = this._multimediaService.playerStatus$
      .subscribe(status => this.state = status)
    this.listObservers$=[observer1$]
  }

  ngOnDestroy(): void {
    //Funcion que se ejecuta antes de ser destruido
    //Siempre que se use la navegacion por angular
    console.log("Media Player component destroy")
    this.listObservers$.forEach(u => u.unsubscribe())
  }
  handlePosition(event: MouseEvent): void{
    const elNative:HTMLElement = this.progressBar.nativeElement
    const {clientX} = event //posicion en eje X
    const { x, width} = elNative.getBoundingClientRect() //ancho del elemento
    // console.log(`Click en ${clientX}, Ancho: ${width}, INICIO ${x}`)
    const click = clientX - x
    const percentageX = (click*100)/width
    // console.log(`${percentageX}%`)
    this._multimediaService.seekAudio(percentageX) //enviamos el porcentaje al servicio
  }
}
