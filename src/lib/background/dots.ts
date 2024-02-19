export class Dot {
    public x: number;
    public y: number;

    constructor(public readonly initialX: number, public readonly initialY: number) {
        this.x = initialX;
        this.y = initialY;
    }
}

export class DotController {
    private targetX: number;
    private targetY: number;

    constructor(private readonly model: Dot) {
        this.targetX = model.initialX;
        this.targetY = model.initialY;
    }

    onPointerMove(pointerX: number, pointerY: number) {
        this.targetX = pointerX;
        this.targetY = pointerY;
    }

    resetTarget() {
        this.targetX = this.model.initialX;
        this.targetY = this.model.initialY;
    }

    update(dt: number) {

    }
}