import GameObject from "./gameobject";
import * as roarengine from "../index.js"


class UIGameObject extends GameObject{
    constructor(offset){
        super();
        this.UILayer = true;
        this.uicamera = null;
        this.offset = offset;
        
    }

    Init(){
        this.uicamera = roarengine.mRenderer.uicamera;
        
        this.rigidbody.Pos.X = this.uicamera.camera.left + this.offset.X;
        this.rigidbody.Pos.Y = this.uicamera.camera.top + this.offset.Y;

        if (this.renderres != null){
            this.renderres.mesh.ObjReference = this;
        }
    }

    Update(elapsed){
        
    }

    onResize(){
        this.rigidbody.Pos.X = this.uicamera.camera.left + this.offset.X;
        this.rigidbody.Pos.Y = this.uicamera.camera.top + this.offset.Y;
    }

    onClick(){

    }

    
}


export default UIGameObject; 