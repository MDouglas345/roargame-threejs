import GameObject from "./gameobject";
import { Background2DInstancedRes } from "../Renderer/renderres";
import { Vec2 } from "../Utility/utility";
import * as roarengine from "../index.js";

export class Background2D extends GameObject{
    constructor(layers, length, width){
        super();
        this.length = length;
        this.width = width;
        this.rigidbody.Disable();
        this.bgLayers = [];

        this.target = null;

        this.createLayers(layers);
    }

    Init(){
        this.target = roarengine.mObjectManager.getObjectByName("mCamera");
        console.log(this.target);
    }

    EarlyUpdate(elapsed){

    }

    createLayers(layers){
        for (let x = 0; x < layers; x++){
            let bg = new GameObject();
            bg.rigidbody.Disable();
            bg.renderres = new Background2DInstancedRes(this.length, this.width, new Vec2(x,0));
            this.bgLayers.push(bg);
        }
    }

    AddToScene(scene){
        this.bgLayers.forEach(function(obj, layer){
            obj.AddToScene(scene);
        });
    }

    UpdateGeometry(){
        this.bgLayers.forEach(function(obj, layer){
            obj.UpdateGeometry();
        });
    }

    


}