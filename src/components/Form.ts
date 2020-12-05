import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import ResourceList from "../resources/ResourceList";
import ActionType from "../enums/ActionType";
import SpriteCommon from "./common/SpriteCommon";
import ActionValue from "../enums/ActionValue";
import Conveyor from "./Conveyor";
import FormType from "../enums/FormType";

class Form extends PIXI.Sprite {
    static POS_FORM: number = 530;
    static POS_COLOR: number = 800;
    static POS_TASTE: number = 1020;
    static POS_GLAZE: number = 1242;
    static POS_PACKAGE: number = 1460;
    static POS_COMPLETED: number = 1680;

    private readonly resByType: any = {};

    private resources!: string[];
    private stepSprites: SpriteCommon[] = [];
    public view!: SpriteCommon;

    constructor() {
        super();

        this.setResources();
    }

    public setForm = (type: ActionValue) => {
        // Map the ActionValue to FormType
        switch (type) {
            case ActionValue.FORM_1:
                return this._setForm(FormType.TYPE_1);
            case ActionValue.FORM_2:
                return this._setForm(FormType.TYPE_2);
            case ActionValue.FORM_3:
                return this._setForm(FormType.TYPE_3);
            case ActionValue.FORM_4:
                return this._setForm(FormType.TYPE_4);
        }
        return this;
    }

    private _setForm = (type: FormType) => {
        this.removeChildren();
        this.resources = this.resByType[type];

        this.stepSprites = new Array(6)
            .fill(1)
            .map((v, i) => {
                const result = new SpriteCommon(this.resources[i]);
                result.alpha = 0;
                result.anchor.set(0.5, 1);
                result.x = result.y = 0;

                this.anchor.set(0, 0);
                this.addChild(result);
                return result;
            });
        return this;
    }

    public setView = (actionType: ActionType) => {
        this.view = this.getViewByAction(actionType) as any;
        return this;
    }

    public gotoAction = (action: ActionType, onComplete?: any) => {
        const view = this.view;

        this.hideAll(view);
        gsap.to(view, {alpha: 1, duration: 0.3});

        switch (action) {
            case ActionType.FORM:
                gsap.to(view, {
                    x: Form.POS_FORM, duration: Conveyor.DURATION, onComplete: () => {
                        this.syncWith(view);
                        onComplete && onComplete();
                    }
                });
                break;
            case ActionType.COLOR:
                gsap.to(view, {
                    x: Form.POS_COLOR, duration: Conveyor.DURATION, onComplete: () => {
                        this.syncWith(view);
                        onComplete && onComplete();
                    }
                });
                break;
            case ActionType.TASTE:
                gsap.to(view, {
                    x: Form.POS_TASTE, duration: Conveyor.DURATION, onComplete: () => {
                        this.syncWith(view);
                        onComplete && onComplete();
                    }
                });
                break;
            case ActionType.GLAZE:
                gsap.to(view, {
                    x: Form.POS_GLAZE, duration: Conveyor.DURATION, onComplete: () => {
                        this.syncWith(view);
                        onComplete && onComplete();
                    }
                });
                break;
            case ActionType.PACKAGE:
                gsap.to(view, {
                    x: Form.POS_PACKAGE, duration: Conveyor.DURATION, onComplete: () => {
                        this.syncWith(view);
                        onComplete && onComplete();
                    }
                });
                break;
            case ActionType.COMPLETED:
                gsap.to(view, {
                    x: Form.POS_COMPLETED, duration: Conveyor.DURATION, onComplete: () => {
                        this.syncWith(view);

                        // view.alpha = 1;
                        gsap.to(view, {x: view.x - 100, y: view.y - 100, alpha: 0, duration: 3, onComplete: () => {
                                onComplete && onComplete();
                        }});
                    }
                });
                break;
        }

        return this;
    }

    public reset = () => {
        // Perhaps we can do explode form here
        this.hideAll();
    }

    private getViewByAction(action: ActionType) {
        switch (action) {
            case ActionType.FORM:
                return this.stepSprites[0];
            case ActionType.FORM_FILLED:
                return this.stepSprites[1];
            case ActionType.COLOR:
                return this.stepSprites[2];
            case ActionType.TASTE:
                return this.stepSprites[3];
            case ActionType.GLAZE:
                return this.stepSprites[4];
            case ActionType.PACKAGE:
                return this.stepSprites[5];
            case ActionType.COMPLETED:
                return this.stepSprites[5];
        }
    }

    private syncWith = (view: SpriteCommon) => {
        this.stepSprites.forEach(s => {
            if (s !== view) {
                s.x = view.x;
                s.y = view.y;
            }
        })

        return this;
    }

    private hideAll = (except?: SpriteCommon) => {

        if (!!except)
            except.alpha = 1;

        this.stepSprites.forEach(s => {
            if (s.alpha > 0 && s !== except)
                gsap.to(s, {alpha: 0, duration: 0.2});
        });
    }

    private setResources = () => {
        const {resByType} = this;

        resByType[FormType.TYPE_1] = [ResourceList.FORM_1_1, ResourceList.FORM_1_2, ResourceList.FORM_1_3, ResourceList.FORM_1_4, ResourceList.FORM_1_5, ResourceList.PACKAGE_1];
        resByType[FormType.TYPE_2] = [ResourceList.FORM_2_1, ResourceList.FORM_2_2, ResourceList.FORM_2_3, ResourceList.FORM_2_4, ResourceList.FORM_2_5, ResourceList.PACKAGE_2];
        resByType[FormType.TYPE_3] = [ResourceList.FORM_3_1, ResourceList.FORM_3_2, ResourceList.FORM_3_3, ResourceList.FORM_3_4, ResourceList.FORM_3_5, ResourceList.PACKAGE_3];
        resByType[FormType.TYPE_4] = [ResourceList.FORM_4_1, ResourceList.FORM_4_2, ResourceList.FORM_4_3, ResourceList.FORM_4_4, ResourceList.FORM_4_5, ResourceList.PACKAGE_4];
    }
}

export default Form;