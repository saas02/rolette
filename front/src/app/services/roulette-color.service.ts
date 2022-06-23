import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouletteColorService {  

  getColor(item:number, maxitem:number) {
    let phase = 0;
    let center = 128;
    let width = 127;
    let frequency = Math.PI*2/maxitem;
    
    let red   = Math.sin(frequency*item+2+phase) * width + center;
    let green = Math.sin(frequency*item+0+phase) * width + center;
    let blue  = Math.sin(frequency*item+4+phase) * width + center;
    
    return this.RGB2Color(red,green,blue);
  }

  RGB2Color(r:number,g:number,b:number) {
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
  }

  byte2Hex(n:number) {
    let nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }

  easeOut(t:number, b:number, c:number, d:number) {
    let ts = (t/=d)*t;
    let tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
  }
}
