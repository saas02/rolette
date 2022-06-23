import { Component, AfterViewInit, Input } from '@angular/core';
import { RouletteFunctionsService } from './services/roulette-functions.service';

import { roulette } from './interfaces/roulette';
import { rouletteOptions } from './interfaces/rouletteOptions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit{
  
  load = false
  @Input()
  roulette:roulette;  

  constructor( private RouletteFunctionsService:RouletteFunctionsService ) {
    this.load = true;
    this.RouletteFunctionsService = RouletteFunctionsService;
    this.roulette = this.RouletteFunctionsService.roulette;

    this.RouletteFunctionsService.getData().subscribe(
      foods => {        
        this.RouletteFunctionsService.rouletteOptions = this.RouletteFunctionsService.getJsonData(foods)
        this.RouletteFunctionsService.roulette.arc = Math.PI / (this.RouletteFunctionsService.rouletteOptions.items.length / 2);           
        this.RouletteFunctionsService.changeOptions(this.RouletteFunctionsService.rouletteOptions.items[0].type);   
        this.load = false;
      }, err => {
        console.log(err);
      }
    );
  }

  ngAfterViewInit(): void {
    
    let alimentos = document.querySelector('#alimentos') as HTMLSelectElement;
    if ( alimentos ) {  
      this.RouletteFunctionsService.changeOptions( alimentos.value );                
      this.RouletteFunctionsService.drawRouletteWheel();
    }       
  }

  spin() {    
    this.roulette.spinAngleStart = Math.random() * 10 + 10;
    this.roulette.spinTime = 0;
    this.roulette.spinTimeTotal = Math.random() * 3 + 4 * 1000;
    this.RouletteFunctionsService.rotateWheel();
  }

  onChangeType(event:any){    
    this.RouletteFunctionsService.changeOptions( event.target.value );
  }
  
}
