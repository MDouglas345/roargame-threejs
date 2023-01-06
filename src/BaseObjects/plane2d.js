import GameObject from "./gameobject";
import { TestRes } from "../Renderer/renderres";
import { Vec2 } from "../Utility/utility";

class Plane2D extends GameObject{
    constructor(length, width){
        super();

        this.renderres = new TestRes(length,width);
        //this.renderres.mesh.rotation.set(0,0,0);

        this.grav = new Vec2(0,-1);
        this.rigidbody.AddAngVel(10);
    }

    Update(elapsed){
        //this.rigidbody.AddAcc(this.grav);
        
    }
}

export default Plane2D;