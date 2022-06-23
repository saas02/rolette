import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { RouletteColorService } from './roulette-color.service';

import { roulette } from '../interfaces/roulette';
import { rouletteOptions } from '../interfaces/rouletteOptions';

@Injectable({
  providedIn: 'root'
})
export class RouletteFunctionsService {

  @Input()
  roulette:roulette;
  rouletteOptions:rouletteOptions;
  rolettefiltered:any;
  //endpointUrl:string = "https://pruebanodejs.amarreyamores.com.co"
  endpointUrl:string = "http://localhost:3080"
  endpoint:string = this.endpointUrl+"/v1/api/foods";  
    
  constructor( 
    private RouletteColorService:RouletteColorService,
    private http: HttpClient
  ) { 
    this.RouletteColorService = RouletteColorService;

    this.roulette = {
      spinArcStart: 0,
      spinTime: 0,
      spinTimeTotal: 0,
      spinAngleStart: 0,
      ctx: null,
      startAngle: 0,
      spinTimeout: null,
      arc: 0
    };
    
    this.rouletteOptions = {
      items: []
    };

    this.rolettefiltered = [];
    
    this.roulette.arc = Math.PI / (this.rouletteOptions.items.length / 2);
    
  }

  getData(){
    return this.http.get(this.endpoint);
  }

  getJsonData(foods:object){
    let foodsData = JSON.parse(JSON.stringify(foods));

    return (foodsData.foods[0]) ? (foodsData.foods[0]): {};
    
  }

  changeOptions(type:string){    
    
    let filtered = this.rouletteOptions.items.filter(
      (item) => {          
        return item.type === type
    });      
    
    this.rolettefiltered.items = filtered;
    this.roulette.arc = Math.PI / (this.rolettefiltered.items.length / 2);
    
    this.drawRouletteWheel();
  }

  rotateWheel() {
    
    this.roulette.spinTime += 30;
    
    if(this.roulette.spinTime >= this.roulette.spinTimeTotal) {
      this.stopRotateWheel();
      return;
    }
    
    let spinAngle = this.roulette.spinAngleStart - this.RouletteColorService.easeOut(this.roulette.spinTime, 0, this.roulette.spinAngleStart, this.roulette.spinTimeTotal);    
    this.roulette.startAngle += (spinAngle * Math.PI / 180);    
    this.drawRouletteWheel();        
    this.roulette.spinTimeout = setTimeout(() => {
      this.rotateWheel();
    }, 30);
  }

  stopRotateWheel() {
    clearTimeout(this.roulette.spinTimeout);
    let degrees = this.roulette.startAngle * 180 / Math.PI + 90;
    let arcd = this.roulette.arc * 180 / Math.PI;
    let index = Math.floor((360 - degrees % 360) / arcd);
    let text = this.capitalize(this.rolettefiltered.items[index].item);
    this.roulette.ctx.save();
    this.roulette.ctx.font = 'bold 30px Helvetica, Arial';    
    this.roulette.ctx.fillText(text, 250 - this.roulette.ctx.measureText(text).width / 2, 250 + 10);
    this.roulette.ctx.restore();
  }

  drawRouletteWheel() {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas?.getContext) {
      let outsideRadius = 200;
      let textRadius = 160;
      let insideRadius = 125;
  
      this.roulette.ctx = canvas.getContext("2d");
      this.roulette.ctx.clearRect(0,0,500,500);
  
      this.roulette.ctx.strokeStyle = "black";
      this.roulette.ctx.lineWidth = 2;
  
      this.roulette.ctx.font = 'bold 12px Helvetica, Arial';
      
      for(let i = 0; i < this.rolettefiltered.items.length; i++) {
        let angle = this.roulette.startAngle + i * this.roulette.arc;
        
        this.roulette.ctx.fillStyle = this.RouletteColorService.getColor(i, this.rolettefiltered.items.length);
  
        this.roulette.ctx.beginPath();
        this.roulette.ctx.arc(250, 250, outsideRadius, angle, angle + this.roulette.arc, false);
        this.roulette.ctx.arc(250, 250, insideRadius, angle + this.roulette.arc, angle, true);
        this.roulette.ctx.stroke();
        this.roulette.ctx.fill();
  
        this.roulette.ctx.save();
        this.roulette.ctx.shadowOffsetX = -1;
        this.roulette.ctx.shadowOffsetY = -1;
        this.roulette.ctx.shadowBlur    = 0;
        this.roulette.ctx.shadowColor   = "rgb(220,220,220)";
        this.roulette.ctx.fillStyle = "black";
        this.roulette.ctx.translate(
          250 + Math.cos(angle + this.roulette.arc / 2) * textRadius, 
          250 + Math.sin(angle + this.roulette.arc / 2) * textRadius
        );
        this.roulette.ctx.rotate(angle + this.roulette.arc / 2 + Math.PI / 2);
        let text = this.capitalize(this.rolettefiltered.items[i].item);
        this.roulette.ctx.fillText(text, -this.roulette.ctx.measureText(text).width / 2, 0);
        this.roulette.ctx.restore();
      } 
  
      //Arrow
      this.roulette.ctx.fillStyle = "black";
      this.roulette.ctx.beginPath();
      this.roulette.ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
      this.roulette.ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
      this.roulette.ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
      this.roulette.ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
      this.roulette.ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
      this.roulette.ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
      this.roulette.ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
      this.roulette.ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
      this.roulette.ctx.fill();
    }
  }

  capitalize(word:string) {
    return word[0].toUpperCase() + word.slice(1);
  }
}
