import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  minutos: number;
  segundos: number;

  constructor() { 
    this.resetTimer();
    setInterval(() => this.tick(), 1000);
  }

  resetTimer(): void {
    this.minutos = 9;
    this.segundos = 59;
  }

  private tick(): void {
    if (--this.segundos < 0){
      this.segundos = 59;
      if (--this.minutos < 0){
        this.minutos = 24;
        this.segundos = 59;
      }
    }
  }

  ngOnInit() {
  }

}
