import nipplejs from 'nipplejs';
import InputController from "./inputcontroller.js";
import * as roarengine from "../index.js";
import { Vec2 } from '../Utility/utility.js';



class JoystickController extends InputController{
    constructor(){
        super();
        this.PrimaryJoystick = null;
        this.SecondaryJoystick = null;
        this.RightDominant = true;
    }   

    Init(controlOptions){
        let renderCanvas = roarengine.mRenderer.renderer.domElement.parentElement;
        renderCanvas.classList.add(["MainJoy"])


        let leftArea = document.createElement("div");
        let rightArea = document.createElement("div");

        leftArea.classList.add(["MinorJoy"]);
        rightArea.classList.add(["MinorJoy2"]);
        

        renderCanvas.appendChild(rightArea);
        renderCanvas.appendChild(leftArea);


        var thisObj = this;

        if (controlOptions.touch.twinstick){
            this.PrimaryJoystick = nipplejs.create({
                zone : leftArea ,
                color : 'black',
                mode : 'semi',
                fadeTime : 5,
                catchDistance : 100
                
            });

            this.SecondaryJoystick = nipplejs.create({
                zone : rightArea,   
                color : 'red',
                mode : 'semi',
                fadeTime : 5,
                catchDistance : 100
            })

            this.PrimaryJoystick.on('move', function(evt, data){
                thisObj.PrimaryDirection.fromRadians(data.angle.radian);

            });

            this.SecondaryJoystick.on('move', function(evt, data){
                thisObj.SecondaryDirection.fromRadians(data.angle.radian);

            });
        }
        else{
            this.PrimaryJoystick = nipplejs.create({
                zone : renderCanvas ,
                color : 'black',
                mode : 'semi',
                fadeTime : 5,
                catchDistance : 100
                
            });
        }
    }

    FlipDominant(){
        let t = this.PrimaryJoystick;
        this.PrimaryJoystick = this.SecondaryJoystick;
        this.SecondaryJoystick = t;
    }

    getPrimaryDirection(){
        return this.PrimaryDirection;
    }



    
}

export default JoystickController;
