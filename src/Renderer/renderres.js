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

export class RenderRes2DInstanced extends RenderRes{
    constructor(layer){

        //let mesh = new THREE.InstancedMesh(geo, mat, RenderRes2DInstanced.MaxCount);
        super(null, null, null);

        this.Position = new THREE.Vector3(0,0,-layer);
        this.Rotation = new THREE.Euler();
        this.Quaternion = new THREE.Quaternion();
        this.Scale = new THREE.Vector3();
        this.Matrix = new THREE.Matrix4();
    }

    addToScene(scene){
        RenderRes2DInstanced.count += 1;
    }

    Update(object){
      
    }

    static create(geo, mat){
        return RenderRes2DInstanced.Mesh = new THREE.InstancedMesh(geo, mat, RenderRes2DInstanced.MaxCount);
    }

}
RenderRes2DInstanced.count = 0;
RenderRes2DInstanced.MaxCount = 100000;
RenderRes2DInstanced.Mesh = null;
RenderRes2DInstanced.Iter = 0;



export class Plane2DInstancedRes extends RenderRes2DInstanced{
    constructor(length,width){
        super(-10);

        this.Scale.setX(length);
        this.Scale.setY(width);
    }

     addToScene(scene){
        Plane2DInstancedRes.count += 1;
    }

    Update(object){
        let rigid = object.rigidbody;

        this.Position.x = rigid.Pos.X;
        this.Position.y = rigid.Pos.Y;
        this.Rotation.z = rigid.Orien;

        this.Quaternion.setFromEuler(this.Rotation);

        this.Matrix.compose(this.Position, this.Quaternion, this.Scale);

        Plane2DInstancedRes.Mesh.setMatrixAt(Plane2DInstancedRes.Iter, this.Matrix);
        Plane2DInstancedRes.Iter += 1;
    }

    static create(){
        Plane2DInstancedRes.Mesh = new THREE.InstancedMesh(
            new THREE.PlaneGeometry(1,1), 
            new THREE.MeshBasicMaterial({
                color : 0x00AA00,
                side : THREE.DoubleSide
        }), Plane2DInstancedRes.MaxCount);

        Plane2DInstancedRes.Mesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage );

        return Plane2DInstancedRes.Mesh;
    }

    static resetIter(){
        Plane2DInstancedRes.Iter = 0;
    }

    static updateMatrix(){
        Plane2DInstancedRes.Mesh.instanceMatrix.needsUpdate = true;
    }
}
Plane2DInstancedRes.count = 0;
Plane2DInstancedRes.MaxCount = 100000;
Plane2DInstancedRes.Mesh = null;
Plane2DInstancedRes.Iter = 0;
