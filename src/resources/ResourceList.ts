class ResourceList {
    static PIXI_LOGO = `../assets/pixi.png`;

    static CUSTOM_RESOURCES: string[] = [];

    static LIST: string[] = [
        ResourceList.PIXI_LOGO,
        ...ResourceList.CUSTOM_RESOURCES,
    ];
}

export default ResourceList;