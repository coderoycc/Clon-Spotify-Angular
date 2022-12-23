import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent {
  listResults$: Observable<any> = of([]) 
  //Definimos de tipo obsrvable para que use async 
  constructor(private searchService: SearchService){}

  receiveData(event: string): void{
    //Se toma el termino cuando tiene 3 caracteres
    console.log("reciviendo datos desde SEARCH", event);
    this.listResults$=this.searchService.searchTracks$(event)
    //Cuando usamos PIPE ASYNC no es necesario "subscribe"
  }
}
