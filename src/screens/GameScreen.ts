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
import ConveyorScreen from "../components/ConveyorScreen";
import Boom from "../components/Boom";
import gsap from 'gsap';

class GameScreen extends PIXI.Container {
    static isNeedHighLightAction = true;
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
    private readonly conveyorScreen: ConveyorScreen = new ConveyorScreen();
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
    // Boom animation
    private readonly boom: Boom = new Boom();
    // endregion

    // region #Steps logic
    public set currentActionStep(value: ActionType) {
        this.enableActions(value, ConveyorScreen.current.form);
    }

    // endregion

    // region #Actions View types
    private readonly actionsViewByType: any = {};
    private readonly actionsViewAll: SpriteInteractive[];
    private readonly actionsFormType: SpriteInteractive[];
    private readonly actionsColorType: SpriteInteractive[];
    private readonly actionsTasteType: SpriteInteractive[];
    private readonly actionsGlazeType: SpriteInteractive[];
    private readonly actionsPackType: SpriteInteractive[];

    private getActionByType = (value: ActionValue) => {
        if (value === ActionValue.FORM_1) return this.actionForm1;
        if (value === ActionValue.FORM_2) return this.actionForm2;
        if (value === ActionValue.FORM_3 || value === ActionValue.FORM_4) return this.actionForm3;
        if (value === ActionValue.COLOR_GRAY) return this.actionColorGray;
        if (value === ActionValue.COLOR_GREEN) return this.actionColorGreen;
        if (value === ActionValue.COLOR_PURPLE) return this.actionColorPurple;
        if (value === ActionValue.TASTE_BUBBLE) return this.actionTasteBubble;
        if (value === ActionValue.TASTE_MINT) return this.actionTasteMint;
        if (value === ActionValue.TASTE_STRAW) return this.actionTasteStrawBanana;
        if (value === ActionValue.TASTE_WATERMELON) return this.actionTasteWatermelon;
        if (value === ActionValue.GLAZE_ON) return this.actionGlazeOn;
        if (value === ActionValue.GLAZE_OFF) return this.actionGlazeOff;
        if (value === ActionValue.PACK_1) return this.actionPackage1;
        if (value === ActionValue.PACK_2) return this.actionPackage2;
        if (value === ActionValue.PACK_3) return this.actionPackage3;
        if (value === ActionValue.PACK_4) return this.actionPackage4;
        return this.actionForm1;
    }
    // endregion

    // region #Wrappers
    private readonly actionsWrapper: PIXI.Container = new PIXI.Container();
    private readonly actionsFormWrapper: PIXI.Container = new PIXI.Container();
    private readonly actionsColorWrapper: PIXI.Container = new PIXI.Container();
    private readonly actionsTasteWrapper: PIXI.Container = new PIXI.Container();
    private readonly actionsGlazeWrapper: PIXI.Container = new PIXI.Container();
    private readonly actionsPackageWrapper: PIXI.Container = new PIXI.Container();

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

        this.setActionControlsStep(ActionType.FORM);
    }

    private reset = () => {
        this.conveyorScreen.randomNext();
        this.conveyorLine.reset();
        this.form.reset();
        this.setActionControlsStep(ActionType.FORM);
    }

    public animate = (delta: number = 0) => {
        // -
    }

    private setActionControlsStep = (type: ActionType) => {
        this.conveyorScreen.print();
        this.currentActionStep = type;
    }

    private disableActions = () => {
        this.actionsViewAll.forEach((s: SpriteInteractive) => s.enabled = false);
    }

    private enableActions = (type: ActionType, value: ActionValue) => {
        this.disableActions();
        this.actionsViewByType[type].forEach((s: SpriteInteractive) => s.enabled = true);

        if (GameScreen.isNeedHighLightAction) {
            // Highlights actual action
            const actionView = this.getActionByType(value);
            this.actionsViewAll.forEach((s: SpriteInteractive) => {
                s.blendMode = PIXI.BLEND_MODES.NORMAL
            });
            actionView.blendMode = PIXI.BLEND_MODES.ADD;
        }
    }

    private getBoomPositionX = (type: ActionType, offset: number = 88): number => {
        switch (type) {
            case ActionType.FORM:
                return Form.POS_FORM + offset;
            case ActionType.COLOR:
                return Form.POS_COLOR + offset;
            case ActionType.TASTE:
                return Form.POS_TASTE + offset;
            case ActionType.GLAZE:
                return Form.POS_GLAZE + offset;
            case ActionType.PACKAGE:
                return Form.POS_PACKAGE + offset;
        }
        return 0;
    }

    private isCorrect = (type: ActionType, value: ActionValue): boolean => {
        const {form, color, glaze, pack, taste} = ConveyorScreen.current;

        // console.log('IsCorrect checking :::');
        // console.log(`form: ${form} color: ${color} glaze: ${glaze} taste: ${taste} pack: ${pack} `);
        // console.log(`type: ${type} value: ${value}`);

        if (type === ActionType.FORM && form !== value) return false;
        if (type === ActionType.COLOR && color !== value) return false;
        if (type === ActionType.GLAZE && glaze !== value) return false;
        if (type === ActionType.TASTE && taste !== value) return false;
        if (type === ActionType.PACKAGE && pack !== value) return false;

        return true;
    }

    private callbackBoom = () => {
        console.info('> Boom! Explode touches the window.bubbleGumBoom() method');
        const w = window as any;
        !!w.bubbleGumBoom && w.bubbleGumBoom();
    };

    private callbackCompleteOne = () => {
        console.info('> Gum is done! I\'m touching the window.bubbleGumDone() method');
        const w = window as any;
        !!w.bubbleGumDone && w.bubbleGumDone();
    };

    private handleBoom = (type: ActionType) => {
        this.form.reset();
        this.boom.restoreDefaults();
        this.boom.x = this.getBoomPositionX(type);
        this.boom.animate(() => {
            this.wheels.animate();
            this.conveyorLine.animate(Form.POS_COMPLETED);
            gsap.to(this.boom, {
                x: Form.POS_COMPLETED + 88, y: this.boom.y - 3, duration: Conveyor.DURATION, onComplete: () => {
                    gsap.to(this.boom, {
                        x: Form.POS_COMPLETED + 136, y: this.boom.y + 150, alpha: 0, duration: 2.5, onComplete: () => {
                            this.callbackBoom();
                            this.reset();
                        }
                    })
                }
            })

            // this.reset();
        })
    }

    private handleAction = (type: ActionType, _value: ActionValue) => {
        let value = _value;

        // Fix the 3 buttons to 4 bubblegums kind of forms mapping
        const requiredForm = ConveyorScreen.current.form;
        if (value == ActionValue.FORM_3 && requiredForm == ActionValue.FORM_4) {
            value = requiredForm;
        }

        const {form, conveyorLine, wheels} = this;

        this.disableActions();

        if (!this.isCorrect(type, value)) {
            this.handleBoom(type);
            return;
        }

        switch (type) {
            case ActionType.FORM:
                this.disableActions();

                conveyorLine.animate(Form.POS_FORM);
                wheels.animate();

                // Set form and move to the form bubble tube
                form.setForm(value)
                    .setView(ActionType.FORM)
                    .gotoAction(type, () => {
                        // When form is on the place, drop the bubble with color
                        this.dropForm.animate(ActionValue.COLOR_GRAY, () => {
                            // When bubble drop is finished, move to the color tube
                            form.setView(ActionType.FORM_FILLED);
                            wheels.animate();
                            conveyorLine.animate(Form.POS_COLOR);

                            form.gotoAction(ActionType.COLOR, () => {
                                // When form is under color tube, enable the next actions
                                this.enableActions(ActionType.COLOR, ConveyorScreen.current.color);
                            });
                        });
                    });
                break;
            case ActionType.COLOR:
                this.disableActions();

                // Here, form is under color tube and user was select color action
                this.dropColor.animate(value, () => {

                    conveyorLine.animate(Form.POS_TASTE);
                    wheels.animate();

                    form.setView(ActionType.COLOR)
                        .gotoAction(ActionType.TASTE, () => {
                            // Enable taste actions only after form is under taste tube
                            this.enableActions(ActionType.TASTE, ConveyorScreen.current.taste);
                        });
                });

                break;
            case ActionType.TASTE:
                this.disableActions();
                this.taste.animate(value, () => {
                    // After taste was selected, move to the glaze tube
                    conveyorLine.animate(Form.POS_GLAZE);
                    wheels.animate();

                    form.setView(ActionType.TASTE)
                        .gotoAction(ActionType.GLAZE, () => {
                            // After form is under glaze tube, enable glaze actions
                            this.enableActions(ActionType.GLAZE, ConveyorScreen.current.glaze);
                        });
                })
                break;
            case ActionType.GLAZE:
                this.disableActions();

                const next = () => {
                    // After taste was selected, move to the glaze tube
                    conveyorLine.animate(Form.POS_PACKAGE);
                    wheels.animate();

                    form.setView(ActionType.GLAZE)
                        .gotoAction(ActionType.PACKAGE, () => {
                            this.enableActions(ActionType.PACKAGE, ConveyorScreen.current.pack);
                        });
                }

                if (value === ActionValue.GLAZE_ON) {
                    this.dropGlaze.animate(ActionValue.COLOR_GRAY, next);
                } else {
                    next();
                }
                break;
            case ActionType.PACKAGE:
                this.disableActions();
                conveyorLine.animate(Form.POS_COMPLETED);
                wheels.animate();

                form.setView(ActionType.PACKAGE)
                    .gotoAction(ActionType.COMPLETED, () => {
                        this.callbackCompleteOne();
                        this.reset();
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
        this.addChild(this.trashUnder);
        this.addChild(this.boom);
        this.addChild(this.trashOver);

        // Conveyor screen hints
        this.addChild(this.conveyorScreen);
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
            conveyorScreen,
            boom,
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

        conveyorScreen.x = 107;
        conveyorScreen.y = 300;

        boom.y = 430;
        boom.x = 500;
        boom.saveDefaults();

        const dropTop = 288;
        dropForm.x = 630;
        dropForm.y = dropTop;

        dropColor.x = 900;
        dropColor.y = dropTop;

        dropGlaze.x = 1338;
        dropGlaze.y = dropTop + 37;
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

        actionColorPurple.saveDefaults();
        actionColorGreen.saveDefaults();
        actionColorGray.saveDefaults();

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

        actionTasteStrawBanana.saveDefaults();
        actionTasteMint.saveDefaults();
        actionTasteBubble.saveDefaults();
        actionTasteWatermelon.saveDefaults();

        actionGlazeOn.saveDefaults();
        actionGlazeOff.saveDefaults();

        actionPackage1.x = 1140;
        actionPackage2.x = actionPackage1.x + actionPackage1.width + actionsGap;
        actionPackage3.x = actionPackage1.x;
        actionPackage3.y = actionPackage1.height + actionsGap;
        actionPackage4.x = actionPackage2.x;
        actionPackage4.y = actionPackage3.y;

        actionPackage1.saveDefaults();
        actionPackage2.saveDefaults();
        actionPackage3.saveDefaults();
        actionPackage4.saveDefaults();
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