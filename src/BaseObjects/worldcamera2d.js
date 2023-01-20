import Camera2D from "./camera2d";

class WorldCamera2D extends Camera2D{
    constructor(frustrum){
        let SCREEN_WIDTH = window.innerWidth;
        let SCREEN_HEIGHT = window.innerHeight;
        let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

        super(frustrum * aspect,frustrum);

        this.frustumSize = frustrum;
        this.aspect = aspect;
    }

    resize(aspect = this.aspect, frustrumSize = this.frustumSize){
        this.camera.left = aspect * frustrumSize / -2;
        this.camera.right = aspect * frustrumSize  / 2;
        this.camera.top = frustrumSize / 2;
        this.camera.bottom = frustrumSize / -2;
        this.camera.updateProjectionMatrix();
    }
}


export default WorldCamera2D;