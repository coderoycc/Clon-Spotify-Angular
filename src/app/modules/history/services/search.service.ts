import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environmet } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly URL = environmet.api

  constructor(private http: HttpClient) { }

  searchTracks$(term: string): Observable<any>{
    return this.http.get(`${this.URL}/tracks?src=${term}`).
      pipe( //usamos pipe para transformar los datos a un array
        map((dataRaw:any) => dataRaw.data)
      )
  }
}
