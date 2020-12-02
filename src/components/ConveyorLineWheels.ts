import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import SpriteCommon from "./common/SpriteCommon";
import ResourceList from "../resources/ResourceList";
import Conveyor from "./Conveyor";

class ConveyorLineWheels extends PIXI.Container {
    private W = 48;
    private H = 48;
    private GAP = 30;
    private WHEELS_COUNT: number = 18;
    private currentRotation: number = 0;

    private readonly wheels: SpriteCommon[];

    constructor() {
        super();

        const {W, H, GAP, WHEELS_COUNT} = this;

        this.wheels = new Array(WHEELS_COUNT).fill(1).map(
            (w, i) => {
                const wheel = new SpriteCommon(ResourceList.WHEEL);
                wheel.anchor.set(0.5);
                wheel.x = i * (W + GAP);
                this.addChild(wheel);
                return wheel;
            });

        this.animate();
    }

    animate = () => {
        this.currentRotation = 0;

        gsap.to(this, {
            currentRotation: 3.14,//6.28,
            duration: Conveyor.DURATION,
            onUpdate: () => {
                this.wheels.forEach(w => w.rotation = this.currentRotation);
            },
        });
    }
}

export default ConveyorLineWheels;