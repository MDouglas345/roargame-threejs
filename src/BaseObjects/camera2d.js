import { Camera } from "./camera";
import * as roarengine from "../index.js"
import { OrthographicCamera, PerspectiveCamera } from "three";
import { Vec2 } from "../Utility/utility";
import { Camera2DRes } from "../Renderer/renderres";



class Camera2D extends Camera{
    constructor(frustumSize, width, height){
        let SCREEN_WIDTH = window.innerWidth;
        let SCREEN_HEIGHT = window.innerHeight;
        let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        //let cam = new OrthographicCamera( 0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 0, 1000 )
        //let cam = new OrthographicCamera( -700, 700, -700, 700, 1, 1000 )
        let cam = new PerspectiveCamera(75, aspect, 1, 1000);
        super(cam);

        this.renderres = new Camera2DRes(cam);

        cam.lookAt(0,0,-9999);
        
    }
}

export default Camera2D