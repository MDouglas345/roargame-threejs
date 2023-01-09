import GameObject from "./gameobject";
import { TestRes } from "../Renderer/renderres";
import { Vec2 } from "../Utility/utility";


class Plane2D extends GameObject{
    constructor(length, width){
        super();
        
        this.renderres = new TestRes(length,width);
        
        
    }

    Update(elapsed){
        
        
    }
}

export default Plane2D;