import { Component } from "@angular/core";
const DEFAULT_MINUTES = 9;
const DEFAULT_SECONDS = 59;

@Component({
  selector: "app-clock",
  templateUrl: "./clock.component.html",
  styleUrls: ["./clock.component.scss"]
})
export class ClockComponent {
  constructor() {
    this.resetTimer();
    setInterval(() => this.actions(), 1000);
  }
  private minutos: string;
  private segundos: string;

  private min: number;
  private sec: number;

  private actions = () => {
    const pipe = (...fns) => fns.map(f => f());
    pipe(
      this.decrement,
      this.asignTimeToView
    );
  };

  private decrement = () => {
    if (--this.sec < 0) {
      this.sec = DEFAULT_SECONDS;
      if (--this.min < 0) {
        this.min = DEFAULT_MINUTES;
        this.sec = DEFAULT_SECONDS;
      }
    }
  };

  private asignTimeToView = () => {
    this.minutos = "" + this.min;
    this.segundos = "" + this.sec;
    if (this.min < 10) {
      this.minutos = "0" + this.min;
    }
    if (this.sec < 10) {
      this.segundos = "0" + this.sec;
    }
  };

  private resetTimer(): void {
    this.min = DEFAULT_MINUTES;
    this.sec = DEFAULT_SECONDS;
  }

  public getTime = () => `${this.minutos} : ${this.segundos}`;
}
