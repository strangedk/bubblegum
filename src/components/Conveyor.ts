import * as PIXI from 'pixi.js';
import gsap from 'gsap';

class Conveyor extends PIXI.TilingSprite {
    static DURATION = 2;
    // One part is 237 * 38
    constructor(texture: PIXI.Texture, width: number = 237 * 7, height: number = 38) {
        super(texture, width, height);

        this.animate();
    }

    public animate = () => {
        gsap.to(this.tilePosition, {
            x: 237, duration: Conveyor.DURATION, onComplete: () => {
                this.tilePosition.x = 0;
                this.animate();
            }
        });
    }
}

export default Conveyor;