import * as PIXI from 'pixi.js';
import ResourceList from "./ResourceList";

class ResourceService {
    static init = (onSuccess: () => void) => {
        const {shared} = PIXI.Loader;

        ResourceList.LIST.forEach(resource => shared.add(resource));

        shared.load(onSuccess);
    }

    static getTexture = (resourceName: string): PIXI.Texture  => {
        return PIXI.Loader.shared.resources[resourceName]?.texture;
    }

    static getSprite = (resourceName: string): PIXI.Sprite => {
        return new PIXI.Sprite(ResourceService.getTexture(resourceName));
    }

    static getSpriteSheet = (name: string, resourceName: string) => {
        const sheet: PIXI.Spritesheet | undefined = PIXI.Loader.shared.resources[resourceName].spritesheet;
        const animatedSprite: PIXI.AnimatedSprite = new PIXI.AnimatedSprite(sheet?.animations[name]);
        return animatedSprite;
    }
}

export default ResourceService;