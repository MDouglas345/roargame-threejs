import GameObject from "./gameobject";
import { AxesHelper } from "three";
import { RenderRes2D } from "../Renderer/renderres";



class CoordHelper extends GameObject{
    constructor(){
        super();
        this.axesHelper = new AxesHelper( 500 );
        this.renderres = new RenderRes2D(null, null, this.axesHelper);
    }
}

export default CoordHelper;