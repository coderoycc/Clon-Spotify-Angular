import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'spotify-a';
  
}

interface Carmodel{
  brand:string,
  model:string,
  year?:number
}
