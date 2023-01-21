import nipplejs from 'nipplejs';
import InputController from './inputcontroller.js';
import * as roarengine from '../index.js';



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

        if (controlOptions.touch.twinstick){
            this.PrimaryJoystick = nipplejs.create({
                zone : leftArea ,
                color : 'black',
                mode : 'semi',
                fadeTime : 5
                
            });

            this.SecondaryJoystick = nipplejs.create({
                zone : rightArea,   
                color : 'red',
                mode : 'semi',
                fadeTime : 5
            })
        }
        else{

        }
    }

    FlipDominant(){
        let t = this.PrimaryJoystick;
        this.PrimaryJoystick = this.SecondaryJoystick;
        this.SecondaryJoystick = t;
    }



    
}

export default JoystickController;