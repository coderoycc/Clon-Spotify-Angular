import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-section-generic',
  templateUrl: './section-generic.component.html',
  styleUrls: ['./section-generic.component.css']
})
export class SectionGenericComponent {
  // Los inputs señalan que desde otro modulo se pueden mandar datos al HTML de la seccion
  @Input() title: string = '' //para utilizar dinamente un componente
  @Input() mode: 'small' | 'big' = 'big'; //solo usa dos valores
  @Input() dataTracks: Array<TrackModel> = [] 
}
