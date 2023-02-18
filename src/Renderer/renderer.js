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
        container.className = 'w-100';
	    document.body.appendChild( container );

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
	    this.renderer.setPixelRatio( window.devicePixelRatio );
        
        this.quality = 1;
	    this.renderer.setSize( this.SCREEN_WIDTH/this.quality, this.SCREEN_HEIGHT/this.quality, false );
        
        this.renderer.domElement.style.width = "101%";
        
	    container.appendChild( this.renderer.domElement );

        
        

	    this.renderer.autoClear = false;
        this.renderer.setClearColor(new THREE.Color(0x553321));

        /*
            Makes it so that Threejs will render objects in the order they where added to the scene.
            also might just help overall performance
        */
        this.renderer.sortObjects = false;

        this.sceneUIElements = null;
        this.sceneUIElementsRaw = null;

        this.stats = null;

        
        this.DummyVec = new THREE.Vector3();
        this.Raycaster = new THREE.Raycaster();


        

        
    }

    changeQuality(num){
        this.quality = num;
	    this.renderer.setSize( this.SCREEN_WIDTH/this.quality, this.SCREEN_HEIGHT/this.quality, false );
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

        this.renderer.setSize( this.SCREEN_WIDTH/this.quality, this.SCREEN_HEIGHT/this.quality, false );

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

        document.addEventListener('mousedown', () => this.RayCasterCallback(event), true);
  
    }

    RayCasterCallback(event){
        this.Raycaster.setFromCamera(
            {
                x: (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1,
                y: -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1
            },
            this.uicamera.camera);

        let intersects = this.Raycaster.intersectObjects(this.sceneUIElementsRaw, false);

        if (intersects.length == 0){
            return;
        }

        intersects[0].object.ObjReference.onClick();
    }
}

export default ThreeRenderer;