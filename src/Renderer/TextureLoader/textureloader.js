import * as THREE from 'three';

class TextureLoader{
    constructor(filepath, imgwidth, imgheight, subimgwidth, subimgheight){
        this.texture = new THREE.TextureLoader().load(filepath);
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

export default TextureLoader;