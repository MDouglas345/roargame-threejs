import { Scene } from 'three';
import * as roarengine from '../index'

class SceneManager{
    constructor(){
        this.scenes = {}
        this.activeScene = null;
    }

    addScene(scene, name){
        this.scenes[name] = scene
    }

    loadScene(name){
        this.activeScene = this.scenes[name]
        roarengine.mObjectManager.loadScene(this.activeScene)
    }
}


export default SceneManager