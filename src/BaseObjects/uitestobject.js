import UIGameObject from "./uigameobject";
import { TestUIRes } from "../Renderer/renderres";

class UITestObject extends UIGameObject{
    constructor(){
        super();

        this.renderres = new TestUIRes(50,50);

    }
}

export default UITestObject;