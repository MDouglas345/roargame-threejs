import { DefaultScene } from "./GameData/Scenes/DefaultScene"

/*
    Establish all scenes here.
    The first scene in the array will be considered the default scene to load upon game start
*/
export default {
   "gameid" : "default",
   "gamename" : "default",
   "scenes" : [
        {
            "name" : "default_scene",
            "scene" : new DefaultScene()
        }
   ],
   "controls" :{
        "keyboard" : {

        },
        "touch" : {
            "twinstick" : true
        }
   }
};