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
  radius = 500;
  inSquare = 0;
  inCircle = 0;
  pi = this.inCircle / this.inSquare;

  ngOnInit() {
    this.initCanvas();
  }

  initCanvas(): void {
    // Initialized Canvas
    this.canvas.nativeElement.width = 500;
    this.canvas.nativeElement.height = 500;
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  start(): void {
    let index = 0;
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    while (index <= 100000) {
      this.checkInCircle(Math.floor(Math.random() * 500), Math.floor(Math.random() * 500));
      this.calculatePi();
      index++;
    }
  }

  // x² + y² <= r²
  checkInCircle(x: number, y: number): void {
    const xSqrt = Math.pow(x, 2);
    const ySqrt = Math.pow(y, 2);
    const rSqrt = Math.pow(this.radius, 2);
    if ((xSqrt + ySqrt) <= rSqrt) {
      this.drawPoint(x, y, true);
    } else {
      this.drawPoint(x, y, false);
    }
  }

  calculatePi(): void {
    this.pi = 4 * (this.inCircle / (this.inSquare + this.inCircle));
  }

  drawPoint(x: number, y: number, inside: boolean): void {
    if (inside) {
      this.ctx.fillStyle = 'red';
      this.inCircle++;
    } else {
      this.ctx.fillStyle = 'blue';
      this.inSquare++;
    }
    this.ctx.fillRect(x, y, 5, 5);
  }
}
