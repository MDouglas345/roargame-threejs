
import './styles/main.scss'

import SceneManager from './SceneManager/scenemanager.js';
import ThreeRenderer from './Renderer/renderer.js';
import ObjectManager from './ObjectManager/objectmanager.js';
import GameSystem  from './GameSystem/gamesystem.js';

import AppData from "./AppData.js";
import { KeyboardController } from './Controller/KeyboardController';









let prevTime = 0, currentTime;

export const mGameSystem = new GameSystem();
export const mInputSystem = new KeyboardController();
export const mObjectManager = new ObjectManager();
export const mSoundSystem = null;
export const mSceneManager = new SceneManager();
export const mRenderer = new ThreeRenderer();






document.addEventListener("keyup", function(event){

  
    mInputSystem.HandleButtonEvent(event.keyCode, event.type);
  
},true);



document.addEventListener("keydown", function(event){

  
    mInputSystem.HandleButtonEvent(event.keyCode, event.type);
    document.documentElement.requestFullscreen().catch(error =>{
            console.log(error.message + " " + error.name);  
        });
  
},true);

document.addEventListener("mousedown", function(event){
    document.documentElement.requestFullscreen().catch(error =>{
            console.log(error.message + " " + error.name);  
        });

    screen.orientation.lock('landscape');
}, true);




init()




function init(){

    const policy = document.permissionsPolicy;
	
    document.title = AppData.gamename;

    screen.orientation.lock('landscape');

    mSceneManager.establishScenes(AppData.scenes)

    mRenderer.bindResize();

    mGameSystem.Init();

    document.addEventListener("keyup", function(event){
        mInputSystem.HandleButtonEvent(event.keyCode, event.type);
    },true);



    document.addEventListener("keydown", function(event){
        mInputSystem.HandleButtonEvent(event.keyCode, event.type);
    },true);

    requestAnimationFrame(gameloop);


}


function gameloop(timestamp){

    const elapsed = (timestamp - prevTime)/1000
    // const fps = 1000 / (timestampe - prevTime)

    prevTime = timestamp

    
    mGameSystem.EarlyUpdate(elapsed);
    mGameSystem.Update(elapsed);
    mGameSystem.LateUpdate(elapsed);
    mGameSystem.UpdateGeometries();
    
    mRenderer.render(mSceneManager.activeScene)
    mRenderer.renderUI(mSceneManager.activeUIScene);

    //console.log(elapsed);

    requestAnimationFrame(gameloop)

}




