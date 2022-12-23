import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Observable, Subscription } from 'rxjs';
import * as dataRaw from '../../../../data/tracks.json';
@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent {
  tracksTrending: Array<TrackModel>=[];
  tracksRandom: Array<TrackModel>=[];
  listObservers$: Array<Subscription>=[];

  constructor(private _trackService: TrackService) {}

  ngOnInit(): void{
    //Iniciar y suscribir
    /*const observer$ = this._trackService.dataTracksTrending$.subscribe(response => {
      this.tracksTrending=response
      this.tracksRandom=response
      console.log('Canciones trendind', response)
    })
    const observer2$ = this._trackService.dataTracksRandom$.subscribe(response => {
      // this.tracksTrending=response
      console.log('Cancion random ingresando', response)
      this.tracksRandom = [...this.tracksRandom, ...response]
    })
    this.listObservers$ = [observer$, observer2$]
    */
    this.loadDataAll()
    this.loadDataRandom()
  }

  loadDataAll(): void{
    this._trackService.getAllTracks$().subscribe(response =>{
      // console.log("API-datos", response)
      this.tracksTrending=response
    })
  }
  loadDataRandom(): void{
    this._trackService.getAllRandom$().subscribe(response =>{
      this.tracksRandom=response
    }, err =>{
      console.log("Fallo en la conexión")
    })
  }
  ngOnDestroy(): void{  
    this.listObservers$.forEach(u=>u.unsubscribe())
  }
}
