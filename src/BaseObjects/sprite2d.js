import GameObject from "./gameobject";
import { Sprite2DInstancedRes } from "../Renderer/renderres";
import { getRandomInt, Vec2 } from "../Utility/utility";



class Sprite2D extends GameObject{
    constructor(length, width){
        super();

        this.yoff = getRandomInt(7);
        this.xoff = getRandomInt(120);
        
        this.renderres = new Sprite2DInstancedRes(length, new Vec2(this.xoff,this.yoff));
        
        
    }

    Update(elapsed){
        
        
    }
}

export default Sprite2D;