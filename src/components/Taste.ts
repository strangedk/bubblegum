import SpriteCommon from "./common/SpriteCommon";
import ResourceList from "../resources/ResourceList";
import ActionValue from "../enums/ActionValue";
import * as PIXI from 'pixi.js';
import gsap from 'gsap';

class Taste extends PIXI.Sprite {
    private readonly tasteBubble: SpriteCommon = new SpriteCommon(ResourceList.TASTE_BUBBLE);
    private readonly tasteMint: SpriteCommon = new SpriteCommon(ResourceList.TASTE_MINT);
    private readonly tasteStrawBanana: SpriteCommon = new SpriteCommon(ResourceList.TASTE_STRAW_BANANA);
    private readonly tasteWatermelon: SpriteCommon = new SpriteCommon(ResourceList.TASTE_WATERMELON);

    private tasteByValue: any = {};

    constructor() {
        super();

        this.tasteByValue[ActionValue.TASTE_BUBBLE] = this.tasteBubble;
        this.tasteByValue[ActionValue.TASTE_MINT] = this.tasteMint;
        this.tasteByValue[ActionValue.TASTE_STRAW] = this.tasteStrawBanana;
        this.tasteByValue[ActionValue.TASTE_WATERMELON] = this.tasteWatermelon;

        this.tasteBubble.saveDefaults();
        this.tasteMint.saveDefaults();
        this.tasteStrawBanana.saveDefaults();
        this.tasteWatermelon.saveDefaults();

        this.tasteBubble.anchor.set(0.5, 0);
        this.tasteMint.anchor.set(0.5, 0);
        this.tasteStrawBanana.anchor.set(0.5, 0);
        this.tasteWatermelon.anchor.set(0.5, 0);

        this.anchor.set(0.5, 0);

        this.addChild(this.tasteBubble);
        this.addChild(this.tasteMint);
        this.addChild(this.tasteStrawBanana);
        this.addChild(this.tasteWatermelon);

        this.hideAll();
    }

    public animate = (actionValue: ActionValue, onComplete?: any) => {
        const value = actionValue as any;
        const currentTaste = this.tasteByValue[value] as SpriteCommon;

        gsap.to(currentTaste, {
            y: currentTaste.y + 50, alpha: 1, duration: 2, onComplete: () => {
                gsap.to(currentTaste, {
                    alpha: 0, duration: 0.2, onComplete: () => {
                        this.hideAll();
                        currentTaste.restoreDefaults();
                        onComplete && onComplete();
                    }
                });
            }
        })
    }

    private hideAll = () => {
        this.tasteBubble.alpha =
            this.tasteMint.alpha =
                this.tasteStrawBanana.alpha =
                    this.tasteWatermelon.alpha = 0;
    }
}

export default Taste;