import GameObject from "./gameobject";
import { TestRes } from "../Renderer/renderres";

class Plane2D extends GameObject{
    constructor(){
        super();

        this.renderres = new TestRes(100,100);
        this.renderres.mesh.rotation.set(0,0,0);
    }
}

export default Plane2D;