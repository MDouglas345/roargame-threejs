import UIGameObject from "./uigameobject";
import { TestUIRes } from "../Renderer/renderres";
import * as roarengine from "../index.js";
import * as util from "../Utility/utility.js"

class UITestObject extends UIGameObject{
    constructor(pos, size, color){
        super(pos);

        this.renderres = new TestUIRes(size.X,size.Y, color);
        

    }

    onClick(){
        //console.log("Success!");
        //roarengine.mInputSystem.FlipDominant();
        //roarengine.mRenderer.changeQuality(util.getRandomInt(15) + 1);
    }


    Hide(){
        this.renderres.mesh.visible = false;
        this.Hidden = false;
    }

    Show(){
        this.renderres.mesh.visible = true;
        this.Hidden = true;
    }
}

export default UITestObject;