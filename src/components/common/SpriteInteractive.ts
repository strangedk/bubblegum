import SpriteCommon from "./SpriteCommon";
import gsap from 'gsap';

class SpriteInteractive extends SpriteCommon {
    private _action!: Function;
    private _enabled!: boolean;

    constructor(resourceName: string) {
        super(resourceName);

        this.on('pointerup', this.exec);
        this.enabled = false;
    }

    private exec = () => {
        this._enabled &&
        this._action &&
        this._action();
    }

    public set action(value: Function) {
        this._action = value;
    }

    public set enabled(value: boolean) {
        this._enabled = value;
        this.interactive = this.buttonMode = value;

        if (value) {
            gsap.to(this, {alpha: 1, duration: 1});
        } else {
            gsap.to(this, {alpha: 0.5, duration: 1});
        }
    }
}

export default SpriteInteractive;