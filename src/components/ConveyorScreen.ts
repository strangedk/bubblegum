import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import SpriteCommon from "./common/SpriteCommon";
import ResourceList from "../resources/ResourceList";
import {BubbleGum1, BubbleGum2, BubbleGum3, BubbleGum4} from "../bubbleGum/BubbleGums";
import BubbleGum from "../bubbleGum/BubbleGum";

class ConveyorScreen extends PIXI.Sprite {
    static byType: BubbleGum[] = [BubbleGum1, BubbleGum2, BubbleGum3, BubbleGum4];
    static current: BubbleGum;

    private readonly example1: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_LEVEL_1);
    private readonly example2: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_LEVEL_2);
    private readonly example3: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_LEVEL_3);
    private readonly example4: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_LEVEL_4);

    private readonly examples: SpriteCommon[];

    private _currentIndex: number = 0;
    private set currentIndex(value: number) {
        if (value >= this.examples.length) {
            this._currentIndex = 0;
        } else {
            this._currentIndex = value;
        }
    }

    private get currentIndex(): number {
        return this._currentIndex;
    }

    constructor() {
        super();

        const {example1, example2, example3, example4} = this;
        this.examples = [example1, example2, example3, example4];
        this.examples.forEach(e => {
            e.anchor.set(0.5, 0.5);
            e.alpha = 0;
            this.addChild(e);
        });

        this.currentIndex = 0;
        this.randomNext();
    }

    public next = () => {
        this.hideAll();
        const ex = this.examples[this.currentIndex];
        ConveyorScreen.current = ConveyorScreen.byType[this.currentIndex];

        ex.scale.set(1);
        ex.alpha = 0;

        gsap.to(ex, {alpha: 1, duration: 1});
        gsap.to(ex.scale, {
            x: 1.1, y: 1.1, duration: 1, yoyo: true, repeat: 20, onComplete: () => {
                gsap.to(ex.scale, {x: 1, y: 1});
            }
        });
        this.currentIndex += 1;
    }

    public randomNext = () => {
        this.currentIndex = Math.floor(Math.random() * this.examples.length);
        this.next();
    }

    public print = () => {
        console.info('%c%s','background: #3366dd; color: white; font-size: 17px',`current >>> ${ConveyorScreen.current.name}`);
    }

    private hideAll = () => {
        this.examples.forEach(e => {
            gsap.killTweensOf(e);
            e.alpha = 0;
        });
    }
}

export default ConveyorScreen;