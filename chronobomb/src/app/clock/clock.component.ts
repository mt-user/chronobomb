import { Component, OnInit } from "@angular/core";
import {FormControl, FormGroup} from '@angular/forms';

const DEFAULT_MINUTES = 9;
const DEFAULT_SECONDS = 59;

@Component({
  selector: "app-clock",
  templateUrl: "./clock.component.html",
  styleUrls: ["./clock.component.scss"]
})
export class ClockComponent implements OnInit {
  constructor() {
    this.resetTimer();
    this.chrono = setInterval(() => this.actions(), 1000);
  }
  ngOnInit(): void {
    this.resetTimer();
  }
  private minutos: string;
  private segundos: string;
  private gifVisibility: boolean;
  private chrono;
  private attempts: number = 0;

  private min: number;
  private sec: number;

  private screen = { code: "", isCode: false };

  private actions = () => {
    const pipe = (...fns) => fns.map(f => f());
    pipe(
      this.decrement,
      this.asignTimeToView,
      this.saveTimeLocal
    );
  };

  private decrement = () => {
    if (--this.sec < 0) {
      this.sec = DEFAULT_SECONDS;
      if (--this.min < 0) {
        this.explode();
      }
    }
  };

  private asignTimeToView = () => {
    this.minutos = `${this.min}`;
    this.segundos = `${this.sec}`;
    if (this.min < 10) {
      this.minutos = `0${this.min}`;
    }
    if (this.sec < 10) {
      this.segundos = `0${this.sec}`;
    }
  };

  private saveTimeLocal = () => {
    if (this.gifVisibility != true){
      localStorage.setItem("segundos", JSON.stringify(this.sec));
      localStorage.setItem("minutos", JSON.stringify(this.min));
    }
  };

  private resetTimer = () => {
    this.min = localStorage.getItem("minutos")? JSON.parse(localStorage.getItem("minutos")) : DEFAULT_MINUTES;
    this.sec = localStorage.getItem("segundos")? JSON.parse(localStorage.getItem("segundos")) : DEFAULT_SECONDS;
  };

  private explode = () => {
      clearInterval(this.chrono);
      this.min = 0;
      this.sec = 0;
      this.gifVisibility = true;
      localStorage.removeItem("minutos");
      localStorage.removeItem("segundos");
  };

  public getTime = () => `${this.minutos}:${this.segundos}`;

  public teclado = (entrada: string) => {
    switch(entrada){
      case "del":
        this.screen.code = this.screen.code.slice(0,this.screen.code.length - 1);
        break;
      case "ok":
        if (this.screen.code == "41253"){
          clearInterval(this.chrono);
          localStorage.removeItem("minutos");
          localStorage.removeItem("segundos");
        } else if (this.attempts + 1 == 3) {
          this.explode();
        } else if (this.min >= 1){
          this.attempts++;
          this.min--;
        } else {
          this.explode();
        }
        break;
      default:
        if (this.screen.code.length < 5) {
          this.screen.code += entrada;
        }
        break;
    }
  };
}
