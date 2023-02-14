import { Rigidbody } from "../Physics/rigidbody";
import { NoRes } from "../Renderer/renderres";

class GameObject{
    constructor(){
        this.rigidbody = new Rigidbody();
        this.renderres = new NoRes();
        this.UILayer = false;
        this.Name = "";
    }

    Init(){

    }

    EarlyUpdate(elapsed){

    }

    Update(elapsed){

    }

    LateUpdate(elapsed){

    }

    UpdateGeometry(){
        this.renderres.Update(this)
    }

    AddToScene(scene){
        this.renderres.addToScene(scene);
    }

}


export default GameObject;