import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { catchError, map, Observable, of } from 'rxjs';
import { environmet } from 'src/environments/environment';
// import * as dataRaw from '../../../data/tracks.json';

@Injectable({
  providedIn: 'root'
})

//Enviamos datos desde un servicio
export class TrackService {
  // dataTracksTrending$: Observable<TrackModel[]> = of([]) //OF inicia con cualquier tipo de dato 
  // dataTracksRandom$: Observable<any> = of([])
  
  private readonly URL = environmet.api;
  
  constructor(private httpClient: HttpClient) { //-> HTTP importar desde la raiz app.module.ts
    /*const { data }: any = (dataRaw as any).default;
    this.dataTracksTrending$ = of(data)
    
    this.dataTracksRandom$ = new Observable((observer)=>{
      const trackExample: TrackModel = {
        _id:99,
        name:'Maria Becerra',
        album: 'Automático',
        url:'https://',
        cover:'https://i1.sndcdn.com/artworks-rGGo7a7YUFZVQ338-1d08fw-t500x500.jpg'
      }
      setTimeout(()=>{
        observer.next([trackExample])
      }, 3500)  //hace que un nuevo track este en el servicio y lo observen los que estan suscritos
    })
    */

  }
  getAllTracks$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`)
      .pipe( //nos permite extraer la informacion que requerimos
        map(({data}:any) => { //para estructurar la informacion
          return data
        }),
        catchError((err)=>{
          console.log("Algo paso", err);
          return of()
        })
      )
  }
  getAllRandom$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`)
      .pipe( //nos permite extraer la informacion que requerimos
        map(({ data }:any) => { //para estructurar la informacion
          return data.reverse()
        })
        //Usamos tap(data => console.log(data)) para ver en consola
      )
  }
}
