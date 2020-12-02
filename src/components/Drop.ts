import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import SpriteCommon from "./common/SpriteCommon";
import ResourceList from "../resources/ResourceList";
import ActionValue from "../enums/ActionValue";

class Drop extends PIXI.Sprite {
    private readonly defaultDropAnchor: PIXI.Point = new PIXI.Point(.5, 0);

    private readonly dropGray: SpriteCommon = new SpriteCommon(ResourceList.DROP_GRAY);
    private readonly dropGreen: SpriteCommon = new SpriteCommon(ResourceList.DROP_GREEN);
    private readonly dropPurple: SpriteCommon = new SpriteCommon(ResourceList.DROP_PURPLE);

    private dropByValue: any = {};

    constructor() {
        super();

        const {dropGray, dropGreen, dropPurple, defaultDropAnchor} = this;

        this.dropByValue[ActionValue.COLOR_GRAY] = dropGray;
        this.dropByValue[ActionValue.COLOR_GREEN] = dropGreen;
        this.dropByValue[ActionValue.COLOR_PURPLE] = dropPurple;

        dropGray.saveDefaults();
        dropGreen.saveDefaults();
        dropPurple.saveDefaults();

        this.hideAll();

        this.anchor.set(0.5, 0);
        this.addChild(dropGray, dropGreen, dropPurple);
    }

    public animate = (actionValue?: ActionValue, onComplete?: any) => {
        this.hideAll();

        const value = actionValue as any;

        const currentDrop = this.dropByValue[value];
        const dropAlpha = () => gsap.to(currentDrop, {alpha: 1, duration: 0.2})
        const dropScale = () => gsap.to(currentDrop.scale, {
            y: 1.5, duration: 0.5, onComplete: () => {
                dropMove();
                changeAnchor();
            }
        });

        const changeAnchor = () => gsap.to(currentDrop.anchor, {y: 1, duration: 1});
        const dropMove = () => gsap.to(currentDrop, {
            y: currentDrop.y + currentDrop.height,
            duration: 1,
            onComplete: dropFlatten
        });

        const dropFlatten = () => gsap.to(currentDrop.scale, {y: 0.2, x: 2, duration: 1, onComplete: vanish});
        const vanish = () => gsap.to(currentDrop, {alpha: 0, duration: 1, onComplete: finish});
        const finish = () => {
            currentDrop.restoreDefaults().resetAlpha().resetScale();
            this.hideAll();
            onComplete && onComplete();
        };

        dropAlpha();
        dropScale();
    }

    private hideAll = () => {
        const {dropGray, dropGreen, dropPurple, defaultDropAnchor} = this;
        dropGray.alpha = dropGreen.alpha = dropPurple.alpha = 0;
        dropGray.anchor = defaultDropAnchor;
        dropGreen.anchor = defaultDropAnchor
        dropPurple.anchor = defaultDropAnchor;
    }
}

export default Drop;