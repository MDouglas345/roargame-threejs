import * as m from '../index'
import GameObject from './gameobject'


class Camera extends GameObject{
    constructor(){
        this.camera = m.mRenderer.camera
        this.rigidbody.Disable();
    }
}