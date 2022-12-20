import * as THREE from 'three';

class ThreeRenderer{
    constructor(){
        this.frustumSize = 600;
        this.SCREEN_WIDTH = window.innerWidth;
        this.SCREEN_HEIGHT = window.innerHeight;
        this.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
        this.camera = new THREE.OrthographicCamera( 0.5 * this.frustumSize * this.aspect / - 2, 0.5 * this.frustumSize * this.aspect / 2, this.frustumSize / 2, this.frustumSize / - 2, 150, 1000 );
        

        let container = document.createElement( 'div' );
	    document.body.appendChild( container );

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
	    this.renderer.setPixelRatio( window.devicePixelRatio );
	    this.renderer.setSize( this.SCREEN_WIDTH, this.SCREEN_HEIGHT );
	    container.appendChild( this.renderer.domElement );

	    this.renderer.autoClear = true;

        
    }


    render(scene){
        this.renderer.render(scene, this.camera)
    }

    bindResize(){
        window.addEventListener('resize', ()=> this.onResize());
    }


    onResize(){
        this.SCREEN_WIDTH = window.innerWidth;
        this.SCREEN_HEIGHT = window.innerHeight;
        this.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;

        this.renderer.setSize( this.SCREEN_WIDTH, this.SCREEN_HEIGHT );

        this.camera.aspect = 0.5 * this.aspect;
        this.camera.updateProjectionMatrix();
    }
}

export default ThreeRenderer