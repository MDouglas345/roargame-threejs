import { Rigidbody } from "../Physics/rigidbody";
import { NoRes } from "../Renderer/renderres";

class GameObject{
    constructor(){
        this.rigidbody = Rigidbody();
        this.renderres = NoRes();
        this.renderlayer = -1;

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

}


export default GameObject;