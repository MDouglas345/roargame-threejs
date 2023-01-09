
import GameObject from './gameobject'


export class Camera extends GameObject{
    constructor(camera){
        super();
        this.camera = camera;
        this.rigidbody.Disable();
        
    }

    resize(aspect){

    }

}