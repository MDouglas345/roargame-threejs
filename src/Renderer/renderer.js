import * as THREE from 'three';

class ThreeRenderer{
    constructor(){
        this.frustumSize = 600;
        this.SCREEN_WIDTH = window.innerWidth;
        this.SCREEN_HEIGHT = window.innerHeight;
        this.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;

        this.camera = null; //new THREE.OrthographicCamera( 0.5 * this.frustumSize * this.aspect / - 2, 0.5 * this.frustumSize * this.aspect / 2, this.frustumSize / 2, this.frustumSize / - 2, 150, 1000 );
        

        let container = document.createElement( 'div' );
	    document.body.appendChild( container );

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
	    this.renderer.setPixelRatio( window.devicePixelRatio );
	    this.renderer.setSize( this.SCREEN_WIDTH, this.SCREEN_HEIGHT );
	    container.appendChild( this.renderer.domElement );

	    this.renderer.autoClear = true;
        this.renderer.setClearColor(new THREE.Color(0x553321));

        /*
            Makes it so that Threejs will render objects in the order they where added to the scene.
            also might just help overall performance
        */
        this.renderer.sortObjects = false;

        
    }


    render(scene){
        this.renderer.render(scene, this.camera.camera)
    }

    bindResize(){
        window.addEventListener('resize', ()=> this.onResize());
    }


    onResize(){
        this.SCREEN_WIDTH = window.innerWidth;
        this.SCREEN_HEIGHT = window.innerHeight;
        this.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;

        this.renderer.setSize( this.SCREEN_WIDTH, this.SCREEN_HEIGHT );

        this.camera.resize(this.aspect);

        
    }
}

export default ThreeRenderer