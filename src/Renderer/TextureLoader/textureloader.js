import * as THREE from 'three';

export class TextureLoader{
constructor(filepath, imgwidth, imgheight){
        // something is up with this, this is an async function and that is causing issues.
        this.texture = TextureLoader.loader.load(filepath,
            function(texture) {
                console.log("Success!");
                console.log(texture);
            },

            // Progress (ignored)
            undefined,

        // On error
        function(err) {
            console.log("Error");
            console.log(err);

        });

        this.width = imgwidth;
        this.height = imgheight;

        this.texture.generateMipmaps = false;
        this.texture.magFilter = THREE.NearestFilter;
        this.minFilter = THREE.NearestFilter;
        this.texture.needsUpdate = true;
        
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


    setAttribute(array, verticies){
        for (let i = 0; i < verticies; i++){
            let iter = i * 2;
            array[iter] = this.width;
            array[iter+1] = this.height;
        }
    }
}
TextureLoader.loader = new THREE.TextureLoader();






export class UniformSpriteTextureLoader extends TextureLoader{
    constructor(filepath, imgwidth, imgheight, subimgwidth, subimgheight){
        super(filepath, imgwidth, imgheight);
        
        this.numOfSubTexX = subimgwidth;
        this.numOfSubTexY = subimgheight;
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
