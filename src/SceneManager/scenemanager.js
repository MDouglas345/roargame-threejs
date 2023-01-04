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
        this.activeScene = new Scene();
        roarengine.mObjectManager.loadScene(this.scenes[name], this.activeScene)
        
    }
}


export default SceneManager