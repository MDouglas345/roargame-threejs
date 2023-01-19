import * as THREE from 'three';


class RenderRes{
    constructor(geometry, material, mesh){
        this.geometry = geometry;
        this.material = material
        this.mesh = mesh
        
    }

    addToScene(scene){

    }

    Update(object){
        
    }
}


export class NoRes extends RenderRes{
    constructor(){
        super(null, null, null)
    }
}

export class RenderRes2D extends RenderRes{
    constructor(geometry, material, mesh){
        super(geometry, material, mesh)
        this.renderlayer = -1;
    }

    Update(object){
        // negative Z values go into the screen
        // positive Z goes towards the camera
        this.mesh.position.set(object.rigidbody.Pos.X, object.rigidbody.Pos.Y, this.renderlayer)
        this.mesh.rotation.z = object.rigidbody.Orien;
    }

    addToScene(scene){
        scene.add(this.mesh);
    }
}

export class Camera2DRes extends RenderRes2D{
    constructor(camera){
        super(null, null, camera)
        this.renderlayer = 100;
    }
}

export class TestRes extends RenderRes2D{
    constructor(length, width){
        let geo = new THREE.PlaneGeometry(length,width);
        let mat =  new THREE.MeshBasicMaterial({
                color : 0xFF0000,
                side : THREE.DoubleSide
        });

        

        super(geo, mat, new THREE.Mesh(geo, mat) )
        this.renderlayer = -10;
    }
}


export class TestUIRes extends RenderRes2D{
    constructor(length, width){
        let geo = new THREE.PlaneGeometry(length,width);
        let mat =  new THREE.MeshBasicMaterial({
                color : 0x0000FF,
                side : THREE.DoubleSide
        });

        

        super(geo, mat, new THREE.Mesh(geo, mat) )
        this.renderlayer = -1;
    }
}
