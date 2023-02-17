import UIGameObject from "./uigameobject";
import { TestUIRes } from "../Renderer/renderres";

class UITestObject extends UIGameObject{
    constructor(pos){
        super(pos);

        this.renderres = new TestUIRes(50,50);
        

    }

    onClick(){
        console.log("Success!");
    }
}

export default UITestObject;