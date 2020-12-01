import * as PIXI from 'pixi.js';
import ResourceService from "../../resources/ResourceService";

class SpriteCommon extends PIXI.Sprite {
    public defaultX: number = 0;
    public defaultY: number = 0;

    constructor(resourceName: string) {
        super();

        this.texture = ResourceService.getTexture(resourceName);
    }

    saveDefaults = () => {
        this.defaultX = this.x;
        this.defaultY = this.y;
    }

    restoreDefaults = () => {
        this.x = this.defaultX;
        this.y = this.defaultY;
        return this;
    }

    resetAlpha = () => {
        this.alpha = 0;
        return this;
    }

    resetScale = () => {
        this.scale.set(1);
        return this;
    }
}

export default SpriteCommon;