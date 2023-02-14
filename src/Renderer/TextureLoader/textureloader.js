import * as THREE from 'three';

var onLoad = function(texture) {

        console.log("Texture is loaded");
        
        /*
        texture.generateMipmaps = false;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.needsUpdate = true;
        */

        
};

var onProgress = function() {
    console.log("Texture is loading...");
};

var onError = function(url) {
        console.log("Textures weren't loaded!");
    };

var LoadingManager = new THREE.LoadingManager(onLoad,onProgress,onError)
var loaded = false

export class TextureLoader{
constructor(filepath, imgwidth, imgheight){
        // something is up with this, this is an async function and that is causing issues.
        this.texture = TextureLoader.loader.load(filepath);
        

        

        this.width = imgwidth;
        this.height = imgheight;

       /* 
        this.texture.generateMipmaps = false;
        this.texture.magFilter = THREE.NearestFilter;
        this.minFilter = THREE.NearestFilter;
        this.texture.needsUpdate = true;
        */
        
        
        
    }

    getTexture(){
        return this.texture;
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }

    static onLoad(texture){
        console.log("Texture loaded!");
    }


    setAttribute(array, verticies){
        for (let i = 0; i < verticies; i++){
            let iter = i * 2;
            array[iter] = this.width;
            array[iter+1] = this.height;
        }
    }
}
TextureLoader.loader = new THREE.TextureLoader(LoadingManager);






export class UniformSpriteTextureLoader extends TextureLoader{
    constructor(filepath, imgwidth, imgheight, subimgwidth, subimgheight){
        super(filepath, imgwidth, imgheight);
        
        this.numOfSubTexX = subimgwidth;
        this.numOfSubTexY = subimgheight;
    }

   


    setAttribute(array, verticies){
        for (let i = 0; i < verticies; i++){
            let iter = i * 4;
            array[iter] = this.width;
            array[iter+1] = this.height;
            array[iter+2] = this.numOfSubTexX;
            array[iter+3] = this.numOfSubTexY;

        }
    }
}
