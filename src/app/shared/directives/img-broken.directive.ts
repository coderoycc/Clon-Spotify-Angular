import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]' //cambiamos dependiendo a la etiqueta
})
// Cuando no existan las imagenes
export class ImgBrokenDirective {
  @Input() customImg:string = '' //Propiedad para hacer dinamica la etiqueta
  
  //Para escuchar eventos de la etiqueta
  @HostListener('error') handleError(): void{
    //cargamos propiedades de la etiqueta 
    const elNative = this.elHost.nativeElement
    elNative.src = '../../../assets/images/img-broken.png'
    console.log("Imagen no cargada", this.elHost, 'Reemplazada por ', elNative.src)
  }//cuando no se puede cargar un elemento
  
  constructor(private elHost: ElementRef) { 
    // console.log(this.elHost)
  }

}
