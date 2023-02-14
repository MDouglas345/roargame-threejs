import * as THREE from 'three';
import Stats from 'stats-js';


class ThreeRenderer{
    constructor(){
        this.frustumSize = 600;
        this.SCREEN_WIDTH = window.innerWidth;
        this.SCREEN_HEIGHT = window.innerHeight;
        this.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;

        this.camera = null; 
        this.uicamera = null;

        let container = document.createElement( 'div' );
	    document.body.appendChild( container );

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
	    this.renderer.setPixelRatio( window.devicePixelRatio);
	    this.renderer.setSize( this.SCREEN_WIDTH, this.SCREEN_HEIGHT );
        
	    container.appendChild( this.renderer.domElement );

        
        

	    this.renderer.autoClear = false;
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setClearColor(new THREE.Color(0x553321));

        /*
            Makes it so that Threejs will render objects in the order they where added to the scene.
            also might just help overall performance
        */
        this.renderer.sortObjects = false;

        this.sceneUIElements = null;

        this.stats = null;



        

        
    }

    renderbase(scene, camera){
        this.renderer.render(scene, camera);
    }


    render(scene){
        this.renderbase(scene, this.camera.camera)
    }

    renderUI(scene){
        this.renderbase(scene, this.uicamera.camera);
        this.stats.update();
        
    }

    bindResize(){
        window.addEventListener('resize', ()=> this.onResize());
        window.addEventListener('orientationchange', ()=> this.onResize());
    }


    onResize(){
        this.SCREEN_WIDTH = window.innerWidth;
        this.SCREEN_HEIGHT = window.innerHeight;
        this.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;

        this.renderer.setSize( this.SCREEN_WIDTH, this.SCREEN_HEIGHT );

        this.camera.resize(this.aspect, this.camera.frustumSize);
        this.uicamera.resize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);

        this.sceneUIElements.forEach(element => {
            element.onResize();
        });

        
    }

    Init(renderOptions){
        if (renderOptions.useInstanced2D){
            console.log("instancing enabled");

        }

        if (renderOptions.displayFPS){
            let stats = new Stats();
            stats.showPanel(0);
            stats.domElement.style.cssText = "position:absolute;top:3px;left:3px;";
            document.body.appendChild(stats.dom);

            this.stats = stats;
            
        } 


      


        

                  
        
        
    }
}

export default ThreeRenderer;