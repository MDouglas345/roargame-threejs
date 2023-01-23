import { Camera } from "./camera";
import * as roarengine from "../index.js"
import { OrthographicCamera, PerspectiveCamera } from "three";
import { Vec2 } from "../Utility/utility";
import { Camera2DRes } from "../Renderer/renderres";



class Camera2D extends Camera{
    constructor(width,length){
       
        let cam = new OrthographicCamera(  width / - 2, width/ 2, length / 2, length / - 2, 0, 1000 );

        /*
        if (!uicam){
            cam = new OrthographicCamera(  frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 0, 1000 )
        }
        else{
            cam = new OrthographicCamera(  width / - 2, width/ 2, length / 2, length / - 2, 0, 1000 )
        }
        */
        //let cam = new OrthographicCamera( -700, 700, -700, 700, 1, 1000 )
        //let cam = new PerspectiveCamera(75, aspect, 1, 1000);
        super(cam);

        this.renderres = new Camera2DRes(cam);
       

        cam.lookAt(0,0,-9999);
        
    }

    

    resize(width, length){
        this.camera.left = width / -2;
        this.camera.right = width  / 2;
        this.camera.top = length / 2;
        this.camera.bottom = length / -2;
        this.camera.updateProjectionMatrix();
    }
}

export default Camera2D