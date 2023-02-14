import { Vec2 } from "../Utility/utility.js";
import InputController from "./inputcontroller.js";

/*
  This class handles all input from the keyboard and makes it easily accessible anywhere else.
  A simple map that links an easy to use string with its key code value.
*/
class KeyboardController extends InputController{
  constructor(){
    super();
    this.KeyStates = [];
    this.KeyMap = new Map();
    this.InitalizeKeys();
  

  }


  InitalizeKeys(){
    this.KeyMap.set('DirUp' , 87);
    this.KeyMap.set('DirDown' , 83);
    this.KeyMap.set('DirLeft' , 65);
    this.KeyMap.set('DirRight' , 68);
    this.KeyMap.set(' ' , 32);
    this.KeyMap.set('+' , 187)
    this.KeyMap.set('-' , 189)
    this.KeyMap.set('G' , 71);
  }

  HandleButtonEvent(keycode, event){
    this.KeyStates[keycode] = event;
  }

  GetKeyState(key){
    return this.KeyStates[this.KeyMap.get(key)];
  }

  RemapKey(orig, newKey){
    this.KeyMap.set(orig, newKey);
  }

  Init(){
    
        document.addEventListener("keyup", ()=> this.HandleButtonEvent(event.keyCode, event.type));
            

        document.addEventListener("keydown", ()=> this.HandleButtonEvent(event.keyCode, event.type));
            

        document.addEventListener("mousedown", ()=> this.HandleButtonEvent(event.keyCode, event.type));
          

                  //document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);

                  /*
                  document.documentElement.webkitRequestFullscreen().catch(error =>{
                      console.log(error.message + " " + error.name);  
                  });

                  screen.orientation.lock('landscape'); // have to be in fullscreen mode first
                  */
                  
    }

    getPrimaryDirection(){
        return this.PrimaryDirection;
    }

    Update(){
       var newdir = this.PrimaryDirection;
       newdir.Reset();

        if (this.GetKeyState('DirUp') == 'keydown'){
            newdir.Y += 1;
        }
        if (this.GetKeyState('DirDown') == 'keydown'){
            newdir.Y -= 1;
        }
        if (this.GetKeyState('DirLeft') == 'keydown'){
            newdir.X -= 1;
        }
        if (this.GetKeyState('DirRight') == 'keydown'){
            newdir.X += 1;

        }

        newdir.Normalize();

    }

}

export default KeyboardController;
