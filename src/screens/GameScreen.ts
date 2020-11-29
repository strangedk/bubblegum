import * as PIXI from 'pixi.js';
import SpriteCommon from "../components/common/SpriteCommon";
import ResourceList from "../resources/ResourceList";

class GameScreen extends PIXI.Container {
    // region #Resources
    //
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
        // -
    }

    private addElements = () => {
        // -
    }

    private arrangeElements = () => {
        const {app} = this;

        // app.renderer.width;
        // app.renderer.height;
    }
    // endregion
}

export default GameScreen;