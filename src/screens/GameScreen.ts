import * as PIXI from 'pixi.js';
import SpriteCommon from "../components/common/SpriteCommon";
import ResourceList from "../resources/ResourceList";
import SpriteInteractive from "../components/common/SpriteInteractive";
import ActionType from "../enums/ActionType";
import ActionValue from "../enums/ActionValue";
import Conveyor from "../components/Conveyor";
import ResourceService from "../resources/ResourceService";
import ConveyorLineWheels from "../components/ConveyorLineWheels";
import Drop from "../components/Drop";
import Form from "../components/Form";
import Taste from "../components/Taste";

class GameScreen extends PIXI.Container {
    // region #Resources
    // Actions form
    private readonly actionForm1: SpriteInteractive = new SpriteInteractive(ResourceList.ACTION_FORM_1);
    private readonly actionForm2: SpriteInteractive = new SpriteInteractive(ResourceList.ACTION_FORM_2);
    private readonly actionForm3: SpriteInteractive = new SpriteInteractive(ResourceList.ACTION_FORM_3);
    // Actions color
    private readonly actionColorGray: SpriteInteractive = new SpriteInteractive(ResourceList.ACTION_COLOR_GRAY);
    private readonly actionColorGreen: SpriteInteractive = new SpriteInteractive(ResourceList.ACTION_COLOR_GREEN);
    private readonly actionColorPurple: SpriteInteractive = new SpriteInteractive(ResourceList.ACTION_COLOR_PURPLE);
    // Actions taste
    private readonly actionTasteBubble: SpriteInteractive = new SpriteInteractive(ResourceList.ACTION_TASTE_BUBBLE);
    private readonly actionTasteMint: SpriteInteractive = new SpriteInteractive(ResourceList.ACTION_TASTE_MINT);
    private readonly actionTasteStrawBanana: SpriteInteractive = new SpriteInteractive(ResourceList.ACTION_TASTE_STRAW_BANANA);
    private readonly actionTasteWatermelon: SpriteInteractive = new SpriteInteractive(ResourceList.ACTION_TASTE_WATERMELON);
    // Actions glaze
    private readonly actionGlazeOn: SpriteInteractive = new SpriteInteractive(ResourceList.ACTION_GLAZE_ON);
    private readonly actionGlazeOff: SpriteInteractive = new SpriteInteractive(ResourceList.ACTION_GLAZE_OFF);
    // Actions package
    private readonly actionPackage1: SpriteInteractive = new SpriteInteractive(ResourceList.ACTION_PACKAGE_1);
    private readonly actionPackage2: SpriteInteractive = new SpriteInteractive(ResourceList.ACTION_PACKAGE_2);
    private readonly actionPackage3: SpriteInteractive = new SpriteInteractive(ResourceList.ACTION_PACKAGE_3);
    private readonly actionPackage4: SpriteInteractive = new SpriteInteractive(ResourceList.ACTION_PACKAGE_4);
    // Conveyor box
    private readonly conveyorConv1: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_CONV_1);
    private readonly conveyorConv2: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_CONV_2);
    // Conveyor examples on the screen
    private readonly conveyorLevel1: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_LEVEL_1);
    private readonly conveyorLevel2: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_LEVEL_2);
    private readonly conveyorLevel3: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_LEVEL_3);
    private readonly conveyorLevel4: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_LEVEL_4);
    // Conveyor lines
    private readonly conveyorLineUp: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_LINE_UP);
    private readonly conveyorTable: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_TABLE);
    // Conveyor light
    private readonly conveyorLight: SpriteCommon = new SpriteCommon(ResourceList.CONVEYOR_LIGHT);
    // Drop
    private readonly dropForm: Drop = new Drop();
    private readonly dropGlaze: Drop = new Drop();
    private readonly dropColor: Drop = new Drop();
    // Taste
    private readonly taste: Taste = new Taste();
    // Trash
    private readonly trashOver: SpriteCommon = new SpriteCommon(ResourceList.TRASH_OVER);
    private readonly trashUnder: SpriteCommon = new SpriteCommon(ResourceList.TRASH_UNDER);
    // Background
    private readonly background: SpriteCommon = new SpriteCommon(ResourceList.BACKGROUND);
    // Machines
    private readonly machines: SpriteCommon = new SpriteCommon(ResourceList.MACHINES);
    // Conveyor line
    private readonly conveyorLine: Conveyor = new Conveyor(ResourceService.getTexture(ResourceList.CONVEYOR_LINE));
    // Conveyor wheels
    private readonly wheels: ConveyorLineWheels = new ConveyorLineWheels();
    // All form behaviour
    private readonly form: Form = new Form();
    // endregion

    // region #Steps logic
    private _currentActionStep!: ActionType;
    public set currentActionStep(value: ActionType) {
        this._currentActionStep = value;
        this.enableActions(value);
    }

    public get currentActionStep(): ActionType {
        return this._currentActionStep;
    }

    private readonly actionsViewByType: any = {};
    private readonly actionsViewAll: SpriteInteractive[];
    private readonly actionsFormType: SpriteInteractive[];
    private readonly actionsColorType: SpriteInteractive[];
    private readonly actionsTasteType: SpriteInteractive[];
    private readonly actionsGlazeType: SpriteInteractive[];
    private readonly actionsPackType: SpriteInteractive[];
    // endregion

    // region #Wrappers
    private readonly actionsWrapper: PIXI.Container = new PIXI.Container();
    private readonly actionsFormWrapper: PIXI.Container = new PIXI.Container();
    private readonly actionsColorWrapper: PIXI.Container = new PIXI.Container();
    private readonly actionsTasteWrapper: PIXI.Container = new PIXI.Container();
    private readonly actionsGlazeWrapper: PIXI.Container = new PIXI.Container();
    private readonly actionsPackageWrapper: PIXI.Container = new PIXI.Container();

    // endregion

    // region #Selected items
    private _selected: any = {
        form: null,
        color: null,
        taste: null,
        glaze: null,
        package: null,
    }

    private set selected(value: any) {
        this._selected = {...this._selected, value};
    }

    private get selected() {
        return this._selected;
    }

    // endregion

    constructor(private app: PIXI.Application) {
        super();

        this.actionsFormType = [this.actionForm1, this.actionForm2, this.actionForm3];
        this.actionsColorType = [this.actionColorGray, this.actionColorGreen, this.actionColorPurple];
        this.actionsTasteType = [this.actionTasteStrawBanana, this.actionTasteMint, this.actionTasteBubble, this.actionTasteWatermelon];
        this.actionsGlazeType = [this.actionGlazeOn, this.actionGlazeOff];
        this.actionsPackType = [this.actionPackage1, this.actionPackage2, this.actionPackage3, this.actionPackage4];

        this.actionsViewByType[ActionType.FORM] = this.actionsFormType;
        this.actionsViewByType[ActionType.COLOR] = this.actionsColorType;
        this.actionsViewByType[ActionType.TASTE] = this.actionsTasteType;
        this.actionsViewByType[ActionType.GLAZE] = this.actionsGlazeType;
        this.actionsViewByType[ActionType.PACKAGE] = this.actionsPackType;

        this.actionsViewAll = [
            ...this.actionsFormType,
            ...this.actionsColorType,
            ...this.actionsTasteType,
            ...this.actionsGlazeType,
            ...this.actionsPackType,
        ];

        this.start();
    }

    // region #Game flow
    public start = () => {
        this.addElements();
        this.arrangeElements();
        this.addEvents();

        setTimeout(() => this.setActionControlsStep(ActionType.FORM), 500);
    }

    private reset = () => {
        this.setActionControlsStep(ActionType.FORM);
    }

    public animate = (delta: number = 0) => {
        // -
    }

    private setActionControlsStep = (type: ActionType) => {
        this.currentActionStep = type;
    }

    private disableActions = () => {
        this.actionsViewAll.forEach((s: SpriteInteractive) => s.enabled = false);
    }

    private enableActions = (type: ActionType) => {
        this.disableActions();
        this.actionsViewByType[type].forEach((s: SpriteInteractive) => s.enabled = true);
    }

    private handleAction = (type: ActionType, value: ActionValue) => {
        const {form, conveyorLine, wheels} = this;

        // if (type !== this.currentActionStep)
        //     return;

        switch (type) {
            case ActionType.FORM:
                this.selected.form = value;
                this.disableActions();

                conveyorLine.animate(530);
                wheels.animate();

                // Set form and move to the form bubble tube
                form.setForm(value).gotoAction(type, () => {
                    // When form is on the place, drop the bubble with color
                    this.dropForm.animate(ActionValue.COLOR_GRAY, () => {
                        // TODO: change form here
                        // When bubble drop is finished, move to the color tube
                        wheels.animate();
                        conveyorLine.animate(800);
                        form.gotoAction(ActionType.COLOR, () => {
                            // When form is under color tube, enable the next actions
                            this.enableActions(ActionType.COLOR);
                        });
                    });
                });
                break;
            case ActionType.COLOR:
                this.selected.color = value;
                this.disableActions();

                // Here, form is under color tube and user was select color action
                this.dropColor.animate(value, () => {
                    // TODO: change form here
                    conveyorLine.animate(1020);
                    wheels.animate();

                    form.gotoAction(ActionType.TASTE, () => {
                        // Enable taste actions only after form is under taste tube
                        this.enableActions(ActionType.TASTE);
                    });
                });

                break;
            case ActionType.TASTE:
                this.selected.taste = value;

                this.disableActions();
                this.taste.animate(value, () => {
                    // TODO: change form here

                    // After taste was selected, move to the glaze tube
                    conveyorLine.animate(1250);
                    wheels.animate();
                    form.gotoAction(ActionType.GLAZE, () => {
                        // After form is under glaze tube, enable glaze actions
                        this.enableActions(ActionType.GLAZE);
                    });
                })
                break;
            case ActionType.GLAZE:
                this.selected.glaze = value;
                this.disableActions();

                const next = () => {
                    conveyorLine.animate(1460);
                    wheels.animate();
                    form.gotoAction(ActionType.PACKAGE, () => {
                        this.enableActions(ActionType.PACKAGE);
                    });
                }

                if (value === ActionValue.GLAZE_ON) {
                    this.dropGlaze.animate(ActionValue.COLOR_GRAY, next);
                } else {
                    next();
                }
                break;
            case ActionType.PACKAGE:
                this.selected.package = value;
                this.disableActions();

                conveyorLine.animate(1680);
                wheels.animate();

                form.gotoAction(ActionType.COMPLETED, () => {
                    this.reset();
                    conveyorLine.reset();
                });
                break;
        }
    }

    // endregion

    // region #Elements and events
    private addElements = () => {
        // Background
        this.addChild(this.background);
        // Blue table background
        this.addChild(this.conveyorTable);

        this.addChild(this.actionsWrapper);
        // Actions wrapper for wrappers
        this.actionsWrapper.addChild(this.actionsFormWrapper);
        this.actionsWrapper.addChild(this.actionsColorWrapper);
        this.actionsWrapper.addChild(this.actionsTasteWrapper);
        this.actionsWrapper.addChild(this.actionsGlazeWrapper);
        this.actionsWrapper.addChild(this.actionsPackageWrapper);
        // Actions with wrappers
        this.actionsFormWrapper.addChild(this.actionForm1);
        this.actionsFormWrapper.addChild(this.actionForm2);
        this.actionsFormWrapper.addChild(this.actionForm3);
        // Color wrapper
        this.actionsColorWrapper.addChild(this.actionColorGray);
        this.actionsColorWrapper.addChild(this.actionColorGreen);
        this.actionsColorWrapper.addChild(this.actionColorPurple);
        // Taste wrapper
        this.actionsTasteWrapper.addChild(this.actionTasteBubble);
        this.actionsTasteWrapper.addChild(this.actionTasteMint);
        this.actionsTasteWrapper.addChild(this.actionTasteStrawBanana);
        this.actionsTasteWrapper.addChild(this.actionTasteWatermelon);
        // Glaze wrapper
        this.actionsGlazeWrapper.addChild(this.actionGlazeOn);
        this.actionsGlazeWrapper.addChild(this.actionGlazeOff);
        // Package wrapper
        this.actionsPackageWrapper.addChild(this.actionPackage1);
        this.actionsPackageWrapper.addChild(this.actionPackage2);
        this.actionsPackageWrapper.addChild(this.actionPackage3);
        this.actionsPackageWrapper.addChild(this.actionPackage4);

        // Back side
        this.addChild(this.conveyorConv2);

        // Wheels and lines
        this.addChild(this.wheels);
        this.addChild(this.conveyorLine);
        this.addChild(this.conveyorLineUp);

        // Form
        this.addChild(this.form);

        // Front side
        this.addChild(this.conveyorConv1);

        // Drop
        this.addChild(this.dropForm);
        this.addChild(this.dropColor);
        this.addChild(this.dropGlaze);

        // Taste
        this.addChild(this.taste);

        // Top machines
        this.addChild(this.machines);

        // Conveyor light
        this.addChild(this.conveyorLight);

        // Trash
        this.addChild(this.trashOver);
        this.addChild(this.trashUnder);

        // Conveyor screen hints
        this.addChild(this.conveyorLevel1);
        this.addChild(this.conveyorLevel2);
        this.addChild(this.conveyorLevel3);
        this.addChild(this.conveyorLevel4);
    }

    private arrangeElements = () => {
        const {
            app,
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
            conveyorLine,
            machines,
            actionsWrapper,
            wheels,
            dropForm,
            dropColor,
            dropGlaze,
            form,
            taste,
        } = this;

        const W = app.renderer.width;
        const H = app.renderer.height;

        machines.x = 380;

        conveyorTable.anchor.set(0, 1);
        conveyorTable.x = 172;
        conveyorTable.y = H - 94;

        trashOver.anchor.set(1, 1);
        trashUnder.anchor.set(1, 1);
        trashUnder.x = trashOver.x = W - 14;
        trashUnder.y = trashOver.y = H - 100;

        conveyorLine.x = 200;
        conveyorLine.y = 440;

        wheels.x = 339;
        wheels.y = 503;

        conveyorLineUp.anchor.set(1, 1);
        conveyorLineUp.x = W - 8;
        conveyorLineUp.y = H / 2 + 64;

        form.x = 100;
        form.y = 470;

        const dropTop = 290;
        dropForm.x = 630;
        dropForm.y = dropTop;

        dropColor.x = 900;
        dropColor.y = dropTop;

        dropGlaze.x = 1338;
        dropGlaze.y = dropTop + 32;
        dropGlaze.scale.set(0.7);

        taste.x = 1120;
        taste.y = 283;

        const actionsGap = 10;
        actionsWrapper.x = 380;
        actionsWrapper.y = 580;

        actionForm1.x = 0;
        actionForm1.y = 0;
        actionForm2.x = actionForm2.width + actionsGap;
        actionForm2.y = 0;
        actionForm3.x = 10;
        actionForm3.y = actionForm3.height + actionsGap;

        actionColorPurple.x = 456;
        actionColorPurple.y = 0;
        actionColorGreen.x = 415;
        actionColorGreen.y = actionColorPurple.height + actionsGap;
        actionColorGray.x = actionColorGreen.x + actionColorGreen.width + actionsGap;
        actionColorGray.y = actionColorGreen.y;

        actionTasteStrawBanana.x = 670;
        actionTasteMint.x = actionTasteStrawBanana.x + actionTasteStrawBanana.width + actionsGap;
        actionTasteBubble.x = actionTasteStrawBanana.x;
        actionTasteBubble.y = actionTasteStrawBanana.height + actionsGap;
        actionTasteWatermelon.x = actionTasteMint.x;
        actionTasteWatermelon.y = actionTasteMint.height + actionsGap;
        actionGlazeOn.x = 920;
        actionGlazeOn.y = 24;
        actionGlazeOff.x = actionGlazeOn.x + actionGlazeOn.width + actionsGap;
        actionGlazeOff.y = actionGlazeOn.y;

        actionPackage1.x = 1140;
        actionPackage2.x = actionPackage1.x + actionPackage1.width + actionsGap;
        actionPackage3.x = actionPackage1.x;
        actionPackage3.y = actionPackage1.height + actionsGap;
        actionPackage4.x = actionPackage2.x;
        actionPackage4.y = actionPackage3.y;
    }

    private addEvents = () => {
        const {handleAction,} = this;

        this.actionForm1.action = () => handleAction(ActionType.FORM, ActionValue.FORM_1);
        this.actionForm2.action = () => handleAction(ActionType.FORM, ActionValue.FORM_2);
        this.actionForm3.action = () => handleAction(ActionType.FORM, ActionValue.FORM_3);
        this.actionColorGray.action = () => handleAction(ActionType.COLOR, ActionValue.COLOR_GRAY);
        this.actionColorGreen.action = () => handleAction(ActionType.COLOR, ActionValue.COLOR_GREEN);
        this.actionColorPurple.action = () => handleAction(ActionType.COLOR, ActionValue.COLOR_PURPLE);
        this.actionTasteBubble.action = () => handleAction(ActionType.TASTE, ActionValue.TASTE_BUBBLE);
        this.actionTasteMint.action = () => handleAction(ActionType.TASTE, ActionValue.TASTE_MINT);
        this.actionTasteStrawBanana.action = () => handleAction(ActionType.TASTE, ActionValue.TASTE_STRAW);
        this.actionTasteWatermelon.action = () => handleAction(ActionType.TASTE, ActionValue.TASTE_WATERMELON);
        this.actionGlazeOn.action = () => handleAction(ActionType.GLAZE, ActionValue.GLAZE_ON);
        this.actionGlazeOff.action = () => handleAction(ActionType.GLAZE, ActionValue.GLAZE_OFF);
        this.actionPackage1.action = () => handleAction(ActionType.PACKAGE, ActionValue.PACK_1);
        this.actionPackage2.action = () => handleAction(ActionType.PACKAGE, ActionValue.PACK_2);
        this.actionPackage3.action = () => handleAction(ActionType.PACKAGE, ActionValue.PACK_3);
        this.actionPackage4.action = () => handleAction(ActionType.PACKAGE, ActionValue.PACK_4);
    }
    // endregion
}

export default GameScreen;