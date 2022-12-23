import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() callBackData: EventEmitter<any> = new EventEmitter()
  // Decorador para comunicarse con el padre (HISTORY-PAGE)

  src: string = ''

  callSearch(term: string): void{
    if(term.length >= 3){
      this.callBackData.emit(term);
      //Enviamos el valor al padre y el lo ejecuta en la funcion declarada > receiveData()
    }
  }
}
