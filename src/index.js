
import './styles/main.scss'

import SceneManager from "./SceneManager/scenemanager.js";
import ThreeRenderer from "./Renderer/renderer.js";
import ObjectManager from "./ObjectManager/objectmanager.js";
import GameSystem  from "./GameSystem/gamesystem.js";

import AppData from "./AppData.js";
import KeyboardController from './Controller/keyboardcontroller.js';
import JoystickController from './Controller/joystickcontroller.js';










function isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|MacIntel/i.test(navigator.userAgent) || navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) {
        return true;
    }
    return false;
}




let prevTime = 0, currentTime;

export const mGameSystem = new GameSystem();
export const mInputSystem = isMobile() ? new JoystickController() : new KeyboardController();
export const mObjectManager = new ObjectManager();
export const mSoundSystem = null;
export const mSceneManager = new SceneManager();
export const mRenderer = new ThreeRenderer();













init()




function init(){

    
    
    document.title = AppData.gamename;

    mSceneManager.establishScenes(AppData.scenes)

    mRenderer.bindResize();

    mGameSystem.Init();

    mInputSystem.Init(AppData.controls);

    mRenderer.Init(AppData.render);

    requestAnimationFrame(gameloop);


}


function gameloop(timestamp){

    const elapsed = (timestamp - prevTime)/1000
    // const fps = 1000 / (timestampe - prevTime)

    //console.log(elapsed);

    prevTime = timestamp

    mInputSystem.Update();

    mGameSystem.EarlyUpdate(elapsed);
    mGameSystem.Update(elapsed);
    mGameSystem.LateUpdate(elapsed);
    mGameSystem.UpdateGeometries();

    mSceneManager.preRender();
    
    mRenderer.render(mSceneManager.activeScene)
    mRenderer.renderUI(mSceneManager.activeUIScene);

    mSceneManager.postRender();

    //console.log(elapsed);

    requestAnimationFrame(gameloop)

}




