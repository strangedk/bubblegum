import * as PIXI from 'pixi.js';
import SpriteCommon from "../components/common/SpriteCommon";
import ResourceList from "../resources/ResourceList";

class GameScreen extends PIXI.Container {
    // region #Resources
    private readonly pixiLogo: SpriteCommon = new SpriteCommon(ResourceList.PIXI_LOGO);
    // endregion

    constructor(private app: PIXI.Application) {
        super();

        this.start();
    }

    // region #Game flow
    public start = () => {
        this.addElements();
        this.arrangeElements();
    }

    public animate = (delta: number = 0) => {
        this.pixiLogo.rotation = delta / 1000;
    }

    private addElements = () => {
        this.addChild(this.pixiLogo);
    }

    private arrangeElements = () => {
        const {app, pixiLogo} = this;

        pixiLogo.anchor.set(0.5);
        pixiLogo.x = app.renderer.width / 2;
        pixiLogo.y = app.renderer.height / 2;
    }
    // endregion
}

export default GameScreen;