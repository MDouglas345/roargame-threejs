import { Scene } from 'three';
import * as roarengine from '../index'

class SceneManager{
    constructor(){
        this.scenes = {}
        this.activeScene = null;
        this.activeSceneName = null;
        this.activeUIScene = null;
    }

    addScene(scene, name){
        this.scenes[name] = scene
    }

    loadScene(name){
        this.activeScene = new Scene();
        this.activeUIScene = new Scene();
        this.activeSceneName = name;
        roarengine.mObjectManager.loadScene(this.scenes[name], this.activeScene, this.activeUIScene)
        
        
    }

    establishScenes(appdata){
        for (let key in appdata){
            let scenedata = appdata[key];
            this.addScene(scenedata.scene, scenedata.name);
        }

        this.loadScene(appdata[0].name);
    }

    resetScene(){
        if (this.activeScene != null && this.activeSceneName != null){
            this.loadScene(this.activeSceneName);
        }
    }   
}


export default SceneManager