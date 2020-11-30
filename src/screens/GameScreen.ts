import * as PIXI from 'pixi.js';
import SpriteCommon from "../components/common/SpriteCommon";
import ResourceList from "../resources/ResourceList";

class GameScreen extends PIXI.Container {
    // region #Resources
    // Actions form
    private readonly actionForm1: SpriteCommon = new SpriteCommon(ResourceList.ACTION_FORM_1);
    private readonly actionForm2: SpriteCommon = new SpriteCommon(ResourceList.ACTION_FORM_2);
    private readonly actionForm3: SpriteCommon = new SpriteCommon(ResourceList.ACTION_FORM_3);
    // Actions color
    private readonly actionColorGray: SpriteCommon = new SpriteCommon(ResourceList.ACTION_COLOR_GRAY);
    private readonly actionColorGreen: SpriteCommon = new SpriteCommon(ResourceList.ACTION_COLOR_GREEN);
    private readonly actionColorPurple: SpriteCommon = new SpriteCommon(ResourceList.ACTION_COLOR_PURPLE);
    // Actions taste
    private readonly actionTasteBubble: SpriteCommon = new SpriteCommon(ResourceList.ACTION_TASTE_BUBBLE);
    private readonly actionTasteMint: SpriteCommon = new SpriteCommon(ResourceList.ACTION_TASTE_MINT);
    private readonly actionTasteStrawBanana: SpriteCommon = new SpriteCommon(ResourceList.ACTION_TASTE_STRAW_BANANA);
    private readonly actionTasteWatermelon: SpriteCommon = new SpriteCommon(ResourceList.ACTION_TASTE_WATERMELON);
    // Actions glaze
    private readonly actionGlazeOn: SpriteCommon = new SpriteCommon(ResourceList.ACTION_GLAZE_ON);
    private readonly actionGlazeOff: SpriteCommon = new SpriteCommon(ResourceList.ACTION_GLAZE_OFF);
    // Actions package
    private readonly actionPackage1: SpriteCommon = new SpriteCommon(ResourceList.ACTION_PACKAGE_1);
    private readonly actionPackage2: SpriteCommon = new SpriteCommon(ResourceList.ACTION_PACKAGE_2);
    private readonly actionPackage3: SpriteCommon = new SpriteCommon(ResourceList.ACTION_PACKAGE_3);
    private readonly actionPackage4: SpriteCommon = new SpriteCommon(ResourceList.ACTION_PACKAGE_4);

    private readonly conveyorConv1: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_CONV_1);
    private readonly conveyorConv2: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_CONV_2);
    private readonly conveyorLevel1: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_LEVEL_1);
    private readonly conveyorLevel2: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_LEVEL_2);
    private readonly conveyorLevel3: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_LEVEL_3);
    private readonly conveyorLevel4: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_LEVEL_4);
    private readonly conveyorLight: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_LIGHT);
    private readonly conveyorLine: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_LINE);
    private readonly conveyorLineUp: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_LINE_UP);
    private readonly conveyorTable: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_TABLE);
    private readonly conveyorTableWithWheels: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_TABLE_WITH_WHEELS);
    private readonly dropGray: SpriteCommon = new SpriteCommon(ResourceList.DROP_GRAY);
    private readonly dropGreen: SpriteCommon = new SpriteCommon(ResourceList.DROP_GREEN);
    private readonly dropPurple: SpriteCommon = new SpriteCommon(ResourceList.DROP_PURPLE);
    private readonly tasteBubble: SpriteCommon = new SpriteCommon(ResourceList.TASTE_BUBBLE);
    private readonly tasteMint: SpriteCommon = new SpriteCommon(ResourceList.TASTE_MINT);
    private readonly tasteStrawBanana: SpriteCommon = new SpriteCommon(ResourceList.TASTE_STRAW_BANANA);
    private readonly tasteWatermelon: SpriteCommon = new SpriteCommon(ResourceList.TASTE_WATERMELON);
    private readonly trashOver: SpriteCommon = new SpriteCommon(ResourceList.TRASH_OVER);
    private readonly trashUnder: SpriteCommon = new SpriteCommon(ResourceList.TRASH_UNDER);
    private readonly background: SpriteCommon = new SpriteCommon(ResourceList.BACKGROUND);
    private readonly machines: SpriteCommon = new SpriteCommon(ResourceList.MACHINES);
    private readonly wheel: SpriteCommon = new SpriteCommon(ResourceList.WHEEL);
    // endregion

    // region #Wrappers
    // All actions wrapper
    private readonly actionsWrapper: PIXI.Container = new PIXI.Container();
    private readonly actionsFormWrapper: PIXI.Container = new PIXI.Container();
    private readonly actionsColorWrapper: PIXI.Container = new PIXI.Container();
    private readonly actionsTasteWrapper: PIXI.Container = new PIXI.Container();
    private readonly actionsGlazeWrapper: PIXI.Container = new PIXI.Container();
    private readonly actionsPackageWrapper: PIXI.Container = new PIXI.Container();
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
        // Background
        this.addChild(this.background);
        // Top machines
        this.addChild(this.machines);

        // Blue table background
        this.addChild(this.conveyorTable);
        this.addChild(this.conveyorTableWithWheels);
        this.conveyorTableWithWheels.alpha = 0.3;

        this.addChild(this.actionsWrapper);
        this.actionsWrapper.addChild(this.actionsFormWrapper);
        this.actionsWrapper.addChild(this.actionsColorWrapper);
        this.actionsWrapper.addChild(this.actionsTasteWrapper);
        this.actionsWrapper.addChild(this.actionsGlazeWrapper);
        this.actionsWrapper.addChild(this.actionsPackageWrapper);
        // Actions with wrappers
        this.actionsFormWrapper.addChild(this.actionForm1);
        this.actionsFormWrapper.addChild(this.actionForm2);
        this.actionsFormWrapper.addChild(this.actionForm3);

        this.actionsColorWrapper.addChild(this.actionColorGray);
        this.actionsColorWrapper.addChild(this.actionColorGreen);
        this.actionsColorWrapper.addChild(this.actionColorPurple);

        this.actionsTasteWrapper.addChild(this.actionTasteBubble);
        this.actionsTasteWrapper.addChild(this.actionTasteMint);
        this.actionsTasteWrapper.addChild(this.actionTasteStrawBanana);
        this.actionsTasteWrapper.addChild(this.actionTasteWatermelon);

        this.actionsGlazeWrapper.addChild(this.actionGlazeOn);
        this.actionsGlazeWrapper.addChild(this.actionGlazeOff);

        this.actionsPackageWrapper.addChild(this.actionPackage1);
        this.actionsPackageWrapper.addChild(this.actionPackage2);
        this.actionsPackageWrapper.addChild(this.actionPackage3);
        this.actionsPackageWrapper.addChild(this.actionPackage4);

        // Back side
        this.addChild(this.conveyorConv2);

        this.addChild(this.conveyorLine);
        this.addChild(this.conveyorLineUp);

        // Front side
        this.addChild(this.conveyorConv1);

        this.addChild(this.conveyorLevel1);
        this.addChild(this.conveyorLevel2);
        this.addChild(this.conveyorLevel3);
        this.addChild(this.conveyorLevel4);

        this.addChild(this.conveyorLight);

        this.addChild(this.dropGray);
        this.addChild(this.dropGreen);
        this.addChild(this.dropPurple);

        this.addChild(this.tasteBubble);
        this.addChild(this.tasteMint);
        this.addChild(this.tasteStrawBanana);
        this.addChild(this.tasteWatermelon);

        this.addChild(this.trashOver);
        this.addChild(this.trashUnder);

        this.addChild(this.wheel);
    }

    private arrangeElements = () => {
        const {
            app,
            conveyorTableWithWheels,
            conveyorTable,
            actionForm1,
            actionForm2,
            actionForm3,
            actionColorGray,
            actionColorGreen,
            actionColorPurple,
            actionTasteBubble,
            actionTasteMint,
            actionTasteStrawBanana,
            actionTasteWatermelon,
            actionGlazeOn,
            actionGlazeOff,
            actionPackage1,
            actionPackage2,
            actionPackage3,
            actionPackage4,
            trashOver,
            trashUnder,
            conveyorLineUp,
            machines,
        } = this;

        const W = app.renderer.width;
        const H = app.renderer.height;

        machines.x = 380;

        conveyorTableWithWheels.anchor.set(0,1);
        conveyorTable.anchor.set(0,1);
        conveyorTable.x = conveyorTableWithWheels.x = 172;
        conveyorTable.y = conveyorTableWithWheels.y = H - 94;

        trashOver.anchor.set(1,1);
        trashUnder.anchor.set(1,1);
        trashUnder.x = trashOver.x = W - 14;
        trashUnder.y = trashOver.y = H - 100;

        conveyorLineUp.anchor.set(1,1);
        conveyorLineUp.x = W-8;
        conveyorLineUp.y = H/2 +64;

        const actionsTop = 580;
        actionForm1.x = 380;
        actionForm1.y = actionsTop;
        actionForm2.x = 380 + actionForm2.width + 10;
        actionForm2.y = actionsTop;
        actionForm3.x = 380;
        actionForm3.y = actionsTop + actionForm3.height + 10;

        actionColorPurple.x = 900;
        actionColorPurple.y = actionsTop;
        
    }
    // endregion
}

export default GameScreen;