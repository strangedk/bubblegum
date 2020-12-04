import BubbleGum from "./BubbleGum";
import ActionValue from "../enums/ActionValue";

const BubbleGum2: BubbleGum = { // Five
    name: 'Five. Form Long. Purple. Watermelon. No glaze. Pack 3',
    form: ActionValue.FORM_3,
    color: ActionValue.COLOR_PURPLE,
    taste: ActionValue.TASTE_WATERMELON,
    glaze: ActionValue.GLAZE_OFF,
    pack: ActionValue.PACK_3,
};

const BubbleGum3: BubbleGum = { // Orbit Mega
    name: 'Orbit Mega. Form top right. White color. Bubbles. Glaze. Pack 2',
    form: ActionValue.FORM_2,
    color: ActionValue.COLOR_GRAY,
    taste: ActionValue.TASTE_BUBBLE,
    glaze: ActionValue.GLAZE_ON,
    pack: ActionValue.PACK_2,
};

const BubbleGum4: BubbleGum = { // Orbit Bananaaaa!
    name: 'Orbit Banana. Form top left. White color. Strawberry Banana. Glaze. Pack 1',
    form: ActionValue.FORM_1,
    color: ActionValue.COLOR_GRAY,
    taste: ActionValue.TASTE_STRAW,
    glaze: ActionValue.GLAZE_ON,
    pack: ActionValue.PACK_1,
};

const BubbleGum1: BubbleGum = { // Double mint
    name: 'Double mint. Form Long. Color green. Mint. No glaze. Pack 4',
    form: ActionValue.FORM_4,
    color: ActionValue.COLOR_GREEN,
    taste: ActionValue.TASTE_MINT,
    glaze: ActionValue.GLAZE_OFF,
    pack: ActionValue.PACK_4,
};

export {BubbleGum1, BubbleGum2, BubbleGum3, BubbleGum4};