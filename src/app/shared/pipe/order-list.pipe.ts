import { Pipe, PipeTransform } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Pipe({
  name: 'orderList'
})
export class OrderListPipe implements PipeTransform {

  // Filtro que transforma los datos que se le pase {{Valor | pipe (orderList)}}
  // value: es el valor que se envia, arg, sort son parametros 
  // El retorno debe ser igual al que se tiene en el valor INICIAL
  transform(value: Array<any>, arg: string | null = null, sort: string = 'asc'): TrackModel[] {
    //Ordenamos los valores y retornamos una array ordenado
    try{
      if(arg == null){
        return value
      }else{
        const tmpList = value.sort((a,b) => {
          if(a[arg] < b[arg]){ //ordena la lista de acuerdo al valor (arg) 'name, albun'
            return -1;
          }else if(a[arg] === b[arg]){
            return 0;
          }else if(a[arg] > b[arg]){
            return 1;
          }
          return 1;
        });
        return (sort==='asc')?tmpList: tmpList.reverse();
      } 
    }catch(e){
      console.log("No se pudo ordenar")
      return value
    }
  }

}
