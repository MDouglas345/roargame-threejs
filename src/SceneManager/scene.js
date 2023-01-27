/*
    This is an object that holds a reference to a threejs scene and an object structure that contains all objects in that scene
*/

import ThreeRenderer from "../Renderer/renderer";
import  * as THREE from "three";
import Camera2D from "../BaseObjects/camera2d";


export class Scene{
    constructor(){
        this.layers = []
        this.MainCamera = null;
        this.UICamera = null;
        
        this.InstancedMeshes = [];
        this.InstancedTypes = [];

    }

    SetMainCamera(object){
        this.MainCamera = object;
        if (this.layers.length == 0){
            console.log("No layers in scene! Cannot add camera!");
            return;
        }
        this.layers[this.layers.length-1].push(object); // add the camera to the last layer of the scene. 
    }

    addLayer(){
        this.layers.push([]);
    }

    addObject(object, layer){
        if (layer < 0 || layer > this.layers.length){
            console.log("Object cannot be pushed into invalid layer!")
            return;
        }
        this.layers[layer].push(object);
    }

    addInstancedMesh(mesh){
        this.InstancedMeshes.push(mesh.create());
        this.InstancedTypes.push(mesh);
    }

    resetInstancedIters(){
        this.InstancedTypes.forEach((type) => {
            type.resetIter();
        });
    }

    updateInstancedMatrices(){
        this.InstancedTypes.forEach((type) => {
            type.updateMatrix();
        });
        
    }

    updateInstanceCount(){
        this.InstancedTypes.forEach((type) => {
            type.updateCount();
        });
    }

    

    createFlatUILayer(){
        this.UICamera = new Camera2D(window.innerWidth, window.innerHeight);
    }
}