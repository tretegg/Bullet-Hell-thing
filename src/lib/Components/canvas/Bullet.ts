import { get } from "svelte/store";

export class Bullet {
    x: number;
    y: number;
    width: number;
    height: number;
    direction : [number, number];
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.width = canvas.width;
        this.height = canvas.height;
        this.direction = this.chooseDirection();
    }

    chooseDirection() : [number, number] {
        const angle = Math.random() * 2 * Math.PI;
        const length = 1; // or any other desired length

        return [length * Math.cos(angle), length * Math.sin(angle)];
    }

    updatePos() : void {
        this.x += this.direction[0];
        this.y += this.direction[1];
    }

    checkBounds() : boolean {
        return this.x < 0 || this.x > this.width || this.y < 0 || this.y > this.height;
    }

}