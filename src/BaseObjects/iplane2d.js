import GameObject from "./gameobject";
import { Plane2DInstancedRes, RenderRes2DInstanced } from "../Renderer/renderres";
import { Vec2 } from "../Utility/utility";


class IPlane2D extends GameObject{
    constructor(length, width){
        super();
        
        this.renderres = new Plane2DInstancedRes(length,width);
        
        
    }

    Update(elapsed){
        
        
    }
}

export default IPlane2D;