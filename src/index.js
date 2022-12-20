import * as THREE from 'three'
import './styles/main.scss'

import SceneManager from './SceneManager/scenemanager.js';
import ThreeRenderer from './Renderer/renderer.js';
import ObjectManager from './ObjectManager/objectmanager.js';
import GameSystem  from './GameSystem/gamesystem.js';




let  scene;

let prevTime = 0, currentTime;

export const mGameSystem = new GameSystem();
export const mInputSystem = null;
export const mObjectManager = new ObjectManager();
export const mSoundSystem = null;
export const mSceneManager = new SceneManager();
export const mRenderer = new ThreeRenderer();



init()


function init(){
    

	scene = new THREE.Scene();

    mRenderer.bindResize();

    mGameSystem.Init();

    requestAnimationFrame(gameloop);


}


function gameloop(timestamp){

    const elapsed = (timestamp - prevTime)/1000
    // const fps = 1000 / (timestampe - prevTime)

    prevTime = timestamp

    
    mGameSystem.EarlyUpdate(elapsed);
    mGameSystem.Update(elapsed)
    mGameSystem.LateUpdate(elapsed)
    

    mRenderer.render(scene)

    requestAnimationFrame(gameloop)

}




