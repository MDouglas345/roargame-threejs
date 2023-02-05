import GameObject from "../../BaseObjects/gameobject";
import { RenderRes2D } from "../../Renderer/renderres";

class testObj extends GameObject{
    constructor(){
        this.renderres = RenderRes2D();
    }
}