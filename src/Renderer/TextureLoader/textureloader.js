import * as THREE from 'three';

class TextureLoader{
    constructor(filepath, imgwidth, imgheight, subimgwidth, subimgheight){
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
        this.subwidth = subimgwidth;
        this.subheight = subimgheight;
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

    getSubWidth(){
        return this.subwidth;
    }

    getSubHeight(){
        return this.subheight;
    }
}
TextureLoader.loader = new THREE.TextureLoader();

export default TextureLoader;