import UIGameObject from "./uigameobject";
import { TestUIRes } from "../Renderer/renderres";
import * as roarengine from "../index.js";

class UITestObject extends UIGameObject{
    constructor(pos){
        super(pos);

        this.renderres = new TestUIRes(50,50);
        

    }

    onClick(){
        console.log("Success!");
        roarengine.mInputSystem.FlipDominant();
    }
}

export default UITestObject;