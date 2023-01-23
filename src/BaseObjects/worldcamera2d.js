import Camera2D from "./camera2d";
import * as roarengine from '../index.js'

class WorldCamera2D extends Camera2D{
    constructor(frustrum){
        let SCREEN_WIDTH = window.innerWidth;
        let SCREEN_HEIGHT = window.innerHeight;
        let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

        super(frustrum * aspect,frustrum);

        this.frustumSize = frustrum;
        this.aspect = aspect;

        this.rigidbody.Enable();
    }

    resize(aspect = this.aspect, frustrumSize = this.frustumSize){
        this.camera.left = aspect * frustrumSize / -2;
        this.camera.right = aspect * frustrumSize  / 2;
        this.camera.top = frustrumSize / 2;
        this.camera.bottom = frustrumSize / -2;
        this.camera.updateProjectionMatrix();
    }

    Update(elapsed){
        
        this.rigidbody.Vel = roarengine.mInputSystem.getPrimaryDirection().rMult(200);
        //console.log(this.rigidbody.Vel);
        
    }
}


export default WorldCamera2D;