import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>()
  // myObservable1$: Observable<any> = new Observable()
  //myObservable1$: Subject<any> = new Subject()
  //un subject es Observable y observer a la vez (pero necesita el subscribe antes Por los ciclos de vida)
  //myObservable1$: BehaviorSubject<any> = new BehaviorSubject('GAS')
  //Se debe inicializar con un valor Observable y observer a la vez
  
  public audio!: HTMLAudioElement

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  //Informacion de la mmusica
  
  public timeElapsed$:BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemainin$:BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)
  constructor() { 
    //Flujo de datos
    // this.myObservable1$ = new Observable(
    //   (observer: Observer<any>) =>{
    //     observer.next("OK Info")
    //     setTimeout(()=>{
    //       observer.complete()
    //     },1000)
    //     setTimeout(()=>{
    //       observer.next("OK 2")
    //     }, 2500)

    //     setTimeout(()=>{
    //       observer.error("Tuberia averiada")
    //     },3500)
    //   }
    // ) //Observable

    // setTimeout(()=>{
    //   this.myObservable1$.next('Enviando NUMEROS...')
    // },2000) //Subjet
    // setTimeout(()=>{
    //   this.myObservable1$.next("ENVIANDO VIDRIO")
    // },2000)
    // setTimeout(()=>{
    //   this.myObservable1$.error("ERROR... enviado")
    // },3000) //BehaviorSubject
    
    this.audio = new Audio() //inicializamos
    this.trackInfo$.subscribe(responseOK =>{
        if(responseOK){
          this.setAudio(responseOK) //audio
        }
      }
    )
    this.listenAllEvents()
  }

  private listenAllEvents(): void{
    // Usa funcion flecha
    this.audio.addEventListener('timeupdate', this.calculateTime, false)
    this.audio.addEventListener('playing', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('ended', this.setPlayerStatus, false)
  }
  private setPlayerStatus=(state:any)=>{
    switch(state.type){
      case 'play':
        this.playerStatus$.next('play')
        break
      case 'playing':
        this.playerStatus$.next('play')
        break
      case 'ended':
        this.playerStatus$.next('ended')
        break
      default: 
        this.playerStatus$.next('paused')
        break
    }    
  }
  private calculateTime = () =>{
    const {duration, currentTime} = this.audio
    // console.log(`Disparando evento: ${duration}\n${currentTime}`)
    this.setTimeElapsed(currentTime)
    this.setTimeRemainin(currentTime, duration)
    this.setPercentage(currentTime, duration)
  }

  private setTimeElapsed(currentTime: number):void{
    //Mostrar el tiempo legible
    let seconds = Math.floor(currentTime%60)
    let minutes = Math.floor((currentTime/60))

    const displaySec = (seconds<10) ? `0${seconds}`:seconds
    const displayMin = (minutes<10) ? `0${minutes}`:minutes
    const final = `${displayMin}:${displaySec}`
    this.timeElapsed$.next(final);
  }

  private setTimeRemainin(currentTime: number, duration: number): void{
    let time = duration - currentTime
    let seconds = Math.floor(time%60)
    let minutes = Math.floor((time/60))

    const displaySec = (seconds<10) ? `0${seconds}`:seconds
    const displayMin = (minutes<10) ? `0${minutes}`:minutes
    const final = `-${displayMin}:${displaySec}`
    this.timeRemainin$.next(final);
  }
  private setPercentage(currentTime: number, duration: number): void{
    let percentage = (currentTime*100)/duration
    this.playerPercentage$.next(percentage)
  }
  

  //Funciones publicas
  public setAudio(track: TrackModel): void{
    // console.log("AUDIO EN SERVICIO", track.url)
    this.audio.src = track.url
    this.audio.play()
  }
  public tooglePlayer(): void{
    (this.audio.paused) ? this.audio.play():this.audio.pause()
  }
  public seekAudio(percentage:number):void{
    const { duration } = this.audio
    const percentageSec = (percentage*duration)/100
    // console.log(`${percentage}%`)
    this.audio.currentTime = percentageSec
  }
}
