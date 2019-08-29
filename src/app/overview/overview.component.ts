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
  @ViewChild('iterationInput', {static: true}) iterationInput: ElementRef;
  ctx: CanvasRenderingContext2D;
  width = 400;
  height = 400;
  radius = 200;

  index = 0;
  inSquare = 0;
  inCircle = 0;

  pi = this.inCircle / this.inSquare;

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.width = this.width;
    this.canvas.nativeElement.height = this.height;
  }

  start(): void {
    setInterval(() => {
      if (this.index <= 1000000) {
        const x = Math.random() * this.width;
        const y = Math.random() * this.height;
        this.inSquare++;
        this.ctx.fillStyle = 'blue';
        if (Math.sqrt(Math.pow(this.radius - x, 2) + Math.pow(this.radius - y, 2)) <= this.radius) {
          this.inCircle++;
          this.ctx.fillStyle = 'red';
        }
        this.ctx.fillRect(x, y, 5, 5);
        this.index++;
        this.pi = 4 * (this.inCircle / this.inSquare);
      }
    }, 1);
  }
}
