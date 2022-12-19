import * as THREE from 'three'
import './styles/main.scss'


let frustumSize = 600;
let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

let camera, renderer, container, scene;

export const GameSystem = null;
export const InputSystem = null;
export const ObjectManager = null;
export const SoundSystem = null;
export const SceneManager = null;



init()

animate()

function init(){
    container = document.createElement( 'div' );
	document.body.appendChild( container );

	scene = new THREE.Scene();

    camera = new THREE.OrthographicCamera( 0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 150, 1000 );



    renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	container.appendChild( renderer.domElement );

	renderer.autoClear = true;



    addEventListener("resize", onResize);


}


function animate(){
    requestAnimationFrame(animate)

    renderer.render(scene, camera)

}



function onResize(){
    SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;
	aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

	camera.aspect = 0.5 * aspect;
	camera.updateProjectionMatrix();
}
