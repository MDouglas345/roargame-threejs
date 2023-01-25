
import Camera2D from "../../BaseObjects/camera2d";
import CoordHelper from "../../BaseObjects/coordhelper";
import Plane2D from "../../BaseObjects/plane2d";
import UITestObject from "../../BaseObjects/uitestobject";
import { Scene } from "../../SceneManager/scene";
import * as util from "../../Utility/utility.js"
import WorldCamera2D from "../../BaseObjects/worldcamera2d";
import { Plane2DInstancedRes, RenderRes2DInstanced } from "../../Renderer/renderres.js";
import IPlane2D from "../../BaseObjects/iplane2d";


/*
    Scene objects are the instructions to which the game engine will follow.
    You establish game objects in this object and then you load the scene.

    Example :

    class DefaultScene extends Scene{
        constructor(){

            addLayer(); // adds a new layer for objects to be placed. Each layer is an array.
            addLayer(); // layers are useful for ordering which objects need to update first
            addLayer(); / but they are also used for determining which objects and collide together.

            // so everything in a single layer will be collidable, unless that object does not have a collider.

            let player = new Player();
            player.rigidbody.Pos = new Vec2(500, 200); // set object attributes to fit the scene

            let enemySpanwer = new EnemySpawner();
            let Background = new Background();
            let camera = new Camera2D(600); // Every scene needs a reference to a camera!

            
            addObject(player, 1); // add object into desired layer.
            addObject(enemySpanwer, 1);
            addObject(enemySpanwer, 0);
            addObject(camera,1); // cameras should be updated after all other objects? 



        }
    }

    The AppData.json will have an instance of this DefaultScene object ready for the game engine to load and execute.
    You can switch scenes via game object logic.

*/



export class DefaultScene extends Scene{
    constructor(){
        super();

        this.addLayer();
        this.addLayer();

        this.addInstancedMesh(Plane2DInstancedRes);

        let testobj = new Plane2D(10,10);
        testobj.rigidbody.Pos.X = 0;

        let uitestobj = new UITestObject(new util.Vec2(100,-100));
        uitestobj.rigidbody.Pos = new util.Vec2(0,0);

        let worldcam = new WorldCamera2D(500);
    
        
        
        let planes = [];

        for (let i = 0; i < 10000; i++){
            planes.push(new IPlane2D(util.getRandomFloat(10) + 5, util.getRandomFloat(10) + 5));
            planes[i].rigidbody.Pos = new util.Vec2(util.getRandomFloat(2000) - 1000, util.getRandomFloat(2000) - 1000);
            planes[i].rigidbody.AngVel = util.getRandomFloat(5) - 2.5;
            this.addObject(planes[i], 1);
        }
        
        
        this.addObject(testobj, 0);

        this.SetMainCamera(worldcam);

        this.createFlatUILayer();

        this.addObject(uitestobj, 0);



        
    }

}