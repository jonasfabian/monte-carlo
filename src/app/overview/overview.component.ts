import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor() {
  }

  @ViewChild('canvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;

  index = 0;
  radius = 500;
  inSquare = 0;
  inCircle = 0;
  pi = this.inCircle / this.inSquare;

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  start(): void {
    // generate 2 random numbers between 0 and 100
    while (this.index <= 100000) {
      this.checkInCircle(Math.floor(Math.random() * 500), Math.floor(Math.random() * 500));
      this.calculatePi();
      this.index++;
    }
  }

  // x² + y² <= r²
  checkInCircle(x: number, y: number): void {
    if ((Math.pow(x, 2) + Math.pow(y, 2)) <= Math.pow(this.radius, 2)) {
      this.inCircle++;
      this.drawPoint(x, y, false);
    } else {
      this.inSquare++;
      this.drawPoint(x, y, true);
    }
  }

  calculatePi(): void {
    this.pi = 4 * (this.inCircle / (this.inSquare + this.inCircle));
  }

  drawPoint(x: number, y: number, inside: boolean): void {
    if (inside) {
      this.ctx.fillStyle = 'blue';
    } else {
      this.ctx.fillStyle = 'red';
    }
    this.ctx.fillRect(x, y, 5, 5);
  }
}
