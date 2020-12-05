import ResourceService from "../resources/ResourceService";
import ResourceList from "../resources/ResourceList";
import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import SpriteCommon from "./common/SpriteCommon";

class Boom extends SpriteCommon {
    static SPEED: number = 0.16;

    private readonly boom: PIXI.AnimatedSprite = ResourceService.getSpriteSheet(ResourceList.BOOM_NAME, ResourceList.BOOM);
    private readonly result: PIXI.Sprite = ResourceService.getSprite(ResourceList.BOOM_RESULT);

    constructor() {
        super();

        this.boom.anchor.set(0.5);
        this.result.anchor.set(0.5);
        this.anchor.set(0.5);
    }

    public reset = () => {
        this.removeChildren();

        this.boom.anchor.set(0.5);
        this.result.anchor.set(0.5);
        this.anchor.set(0.5);

        this.boom.alpha = 1;
        this.result.alpha = 1;
        this.alpha = 1;
    }

    public animate = (onComplete: () => void) => {
        this.reset();

        const {boom, result} = this;

        this.addChild(boom);

        boom.gotoAndStop(0);
        boom.play();
        boom.loop = false;
        boom.animationSpeed = Boom.SPEED;
        boom.onComplete = () => {
            this.removeChild(boom);
            this.addChild(result);
            result.scale.set(1);
            gsap.fromTo(result, {alpha: 0}, {
                alpha: 1, duration: 3, onComplete: () => {
                    onComplete();
                }
            });
        };
    }
}

export default Boom;