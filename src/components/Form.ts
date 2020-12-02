import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import FormType from "../enums/FormType";
import ResourceList from "../resources/ResourceList";
import ActionType from "../enums/ActionType";
import SpriteCommon from "./common/SpriteCommon";
import ActionValue from "../enums/ActionValue";
import Conveyor from "./Conveyor";

class Form extends PIXI.Sprite {
    private readonly resByType: any = {};

    private resources!: string[];
    private stepSprites!: SpriteCommon[];

    private type!: FormType;

    private _currentStep = 0;

    constructor() {
        super();

        this.setResources();
    }

    public setForm = (type: ActionValue) => {
        switch (type) {
            case ActionValue.FORM_1:
                this._setForm(FormType.TYPE_1);
                break;
            case ActionValue.FORM_2:
                this._setForm(FormType.TYPE_2);
                break;
            case ActionValue.FORM_3:
                this._setForm(FormType.TYPE_3);
                break;
        }
        return this;
    }

    private _setForm = (type: FormType) => {
        while (this.children.length) {
            this.removeChildAt(0);
        }
        this.type = type;
        this.resources = this.resByType[type];

        this.stepSprites = new Array(5)
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

        this.hideAll();
        return this;
    }

    public setView = () => {

    }

    public gotoAction = (action: ActionType, onComplete?: any) => {
        const view = this.getViewByAction(action) as any;
        this.hideAll(view);
        gsap.to(view, {alpha: 1, duration: 0.3});

        switch (action) {
            case ActionType.FORM:
                gsap.to(view, {
                    x: 530, duration: Conveyor.DURATION, onComplete: () => {
                        this.syncWith(view);
                        onComplete && onComplete();
                    }
                });
                break;
            case ActionType.COLOR:
                gsap.to(view, {
                    x: 800, duration: Conveyor.DURATION, onComplete: () => {
                        this.syncWith(view);
                        onComplete && onComplete();
                    }
                });
                break;
            case ActionType.TASTE:
                gsap.to(view, {
                    x: 1020, duration: Conveyor.DURATION, onComplete: () => {
                        this.syncWith(view);
                        onComplete && onComplete();
                    }
                });
                break;
            case ActionType.GLAZE:
                gsap.to(view, {
                    x: 1250, duration: Conveyor.DURATION, onComplete: () => {
                        this.syncWith(view);
                        onComplete && onComplete();
                    }
                });
                break;
            case ActionType.PACKAGE:
                gsap.to(view, {
                    x: 1460, duration: Conveyor.DURATION, onComplete: () => {
                        this.syncWith(view);
                        onComplete && onComplete();
                    }
                });
                break;
            case ActionType.COMPLETED:
                gsap.to(view, {
                    x: 1680, duration: Conveyor.DURATION, onComplete: () => {
                        this.syncWith(view);

                        gsap.to(view, {x:view.x-100, y:view.y-100, alpha: 0, duration: 3});

                        onComplete && onComplete();
                    }
                });
                break;
        }

        return this;
    }

    private getViewByAction(action: ActionType) {
        switch (action) {
            case ActionType.FORM:
                return this.stepSprites[0];
            case ActionType.COLOR:
                return this.stepSprites[1];
            case ActionType.TASTE:
                return this.stepSprites[2];
            case ActionType.GLAZE:
                return this.stepSprites[3];
            case ActionType.PACKAGE:
                return this.stepSprites[3];
            case ActionType.COMPLETED:
                return this.stepSprites[4];
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
        this.stepSprites.forEach(s => {
            if (s.alpha > 0 && s !== except)
                gsap.to(s, {alpha: 0, duration: 0.2});
        });
    }

    private setResources = () => {
        const {resByType} = this;

        resByType[FormType.TYPE_1] = [ResourceList.FORM_1_1, ResourceList.FORM_1_2, ResourceList.FORM_1_3, ResourceList.FORM_1_4, ResourceList.PACKAGE_1];
        resByType[FormType.TYPE_2] = [ResourceList.FORM_2_1, ResourceList.FORM_2_2, ResourceList.FORM_2_3, ResourceList.FORM_2_4, ResourceList.PACKAGE_2];
        resByType[FormType.TYPE_3] = [ResourceList.FORM_3_1, ResourceList.FORM_3_2, ResourceList.FORM_3_3, ResourceList.FORM_3_4, ResourceList.PACKAGE_3];
        resByType[FormType.TYPE_4] = [ResourceList.FORM_4_1, ResourceList.FORM_4_2, ResourceList.FORM_4_3, ResourceList.FORM_4_4, ResourceList.PACKAGE_4];
    }
}

export default Form;