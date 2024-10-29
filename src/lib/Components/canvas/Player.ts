export class Player {
    x: number;
    y: number;
    canvas: HTMLCanvasElement;
    speed : number;
    direction: number[]

    constructor(canvas : HTMLCanvasElement) {
        this.canvas = canvas;
        this.speed = 2;
        this.x = canvas.width / 2;
        this.y = canvas.height - canvas.height / 4;
        this.direction = [0, 0];
    }

    updatePos(gerby: boolean[], gerbi: boolean[]) : void {
        this.processGerb(gerby, 0)
        this.processGerb(gerbi, 1)
    }

    private processGerb(gerb: boolean[], index: number) {
        console.log(gerb, index)

        if (gerb[0] && !gerb[1]) {
            this.direction[index] = -this.speed
        }
        else if (!gerb[0] && gerb[1]) {
            this.direction[index] = this.speed
        }
        else {
            this.direction[index] = 0
        }
    }
} 