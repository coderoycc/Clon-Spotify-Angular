import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
// import * as dataRaw from '../../../data/tracks.json';
@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css']
})
export class PlayListBodyComponent {
  // tracks: TrackModel[] = []
  @Input() tracks: TrackModel[] = []  
  optionsSort: {property:string | null, order:string}={property:null, order:'asc'}
  ngOnInit(): void{
    // const {data}: any = (dataRaw as any).default
    // this.tracks = data;

  }
  changeSort(property: string): void{
    const { order } = this.optionsSort
    this.optionsSort = {
      property: property,
      order: order === 'asc' ? 'desc':'asc'
    }
    console.log(this.optionsSort)
  }
}
