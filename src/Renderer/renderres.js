import * as THREE from 'three';

class RenderRes{
    constructor(geometry, material, mesh){
        this.geometry = geometry;
        this.material = material
        this.mesh = mesh
    }

    addToScene(){

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
    }

    Update(object){
        // negative Z values go into the screen
        // positive Z goes towards the camera
        this.mesh.position.set(object.rigidbody.Pos.x, object.rigidbody.Pos.y, object.renderlayer)
        this.mesh.rotation.z = object.rigidbody.Orien;
    }
}

export class TestRes extends RenderRes2D{
    constructor(){
        let geo = THREE.PlaneGeometry(1,1);
        let mat = THREE.MeshBasicMaterial({
                color : 0xFF0000,
                side : THREE.DoubleSide
        });

        super(geo, mat, THREE.Mesh(geo, mat) )
    }
}
