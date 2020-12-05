import * as PIXI from 'pixi.js';
import gsap from 'gsap';

class Conveyor extends PIXI.TilingSprite {
    static DURATION = 3;
    static TILE_WIDTH = 237;

    // One part is 237 * 38
    constructor(texture: PIXI.Texture, width: number = Conveyor.TILE_WIDTH * 7, height: number = 38) {
        super(texture, width, height);
    }

    public animate = (distance: number = Conveyor.TILE_WIDTH, duration = Conveyor.DURATION) => {
        gsap.to(this.tilePosition, {x: distance, duration: duration});
    }

    public reset = () => {
        while(this.tilePosition.x > 0) {
            this.tilePosition.x -= Conveyor.TILE_WIDTH;
        }

        gsap.to(this.tilePosition, {x: 0, duration: 1,})
    }
}

export default Conveyor;