import GameObject from "./gameobject";
import { Sprite2DInstancedRes } from "../Renderer/renderres";
import { Vec2 } from "../Utility/utility";


class Sprite2D extends GameObject{
    constructor(length, width){
        super();
        
        this.renderres = new Sprite2DInstancedRes(length, new Vec2(0,0));
        
        
    }

    Update(elapsed){
        
        
    }
}

export default Sprite2D;