/*
  This class handles all input from the keyboard and makes it easily accessible anywhere else.
  A simple map that links an easy to use string with its key code value.
*/
export class KeyboardController{
  constructor(){
    this.KeyStates = [];
    this.KeyMap = new Map();
    this.InitalizeKeys();
  }


  InitalizeKeys(){
    this.KeyMap.set('W' , 87);
    this.KeyMap.set('S' , 83);
    this.KeyMap.set('A' , 65);
    this.KeyMap.set('D' , 68);
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
}
