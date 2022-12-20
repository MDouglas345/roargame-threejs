/*
    This is an object that holds a reference to a threejs scene and an object structure that contains all objects in that scene
*/

import * as THREE from 'three'

class Scene{
    constructor(){
        this.scene = THREE.Scene()
        this.layers = []
    }
}