import * as THREE from 'three';
import { getInstancedSpriteMat } from './ShaderMaterials/instancedspritemat';
import testsprite from '../assets/testsprites.png';
import roarstar from "../assets/star.png";
import TextureLoader from './TextureLoader/textureloader';


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

        let dummy = Plane2DInstancedRes.dummy;

        dummy.position.x = rigid.Pos.X;
        dummy.position.y = rigid.Pos.Y;
        dummy.position.z = -100;
        dummy.scale.set(this.Scale.x, this.Scale.y, 1);
        dummy.rotation.z = rigid.Orien;

        dummy.updateMatrix();

        Plane2DInstancedRes.Mesh.setMatrixAt(Plane2DInstancedRes.Iter ++, dummy.matrix);
        
    }

    static create(){
        Plane2DInstancedRes.Mesh = new THREE.InstancedMesh(
            new THREE.PlaneGeometry(1,1), 
            new THREE.MeshBasicMaterial({
                color : 0xeedd00,
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

    static updateCount(){
        Plane2DInstancedRes.Mesh.count = Plane2DInstancedRes.count;
    }
}
Plane2DInstancedRes.count = 0;
Plane2DInstancedRes.MaxCount = 100000;
Plane2DInstancedRes.Mesh = null;
Plane2DInstancedRes.Iter = 0;
Plane2DInstancedRes.dummy = new THREE.Object3D();




export class Sprite2DInstancedRes extends RenderRes2DInstanced{
    constructor(length, uvcoords){
        super(-10);
        this.uvcoords = uvcoords;
        this.Scale.setX(length);
        this.Scale.setY(length);
        this.Euler = new THREE.Euler(0,0,0,'XYZ');
        this.Quaternion = new THREE.Quaternion();
    }

     addToScene(scene){
        Sprite2DInstancedRes.count += 1;
    }

    static create(){
        Sprite2DInstancedRes.UVsArray = new Float32Array(Sprite2DInstancedRes.MaxCount * 2);
        Sprite2DInstancedRes.PositionsArray = new Float32Array(Sprite2DInstancedRes.MaxCount * 3);
        Sprite2DInstancedRes.OrientationsArray = new Float32Array(Sprite2DInstancedRes.MaxCount);
        Sprite2DInstancedRes.ScalesArray = new Float32Array(Sprite2DInstancedRes.MaxCount * 3);

        Sprite2DInstancedRes.UVAttriubutes = new THREE.InstancedBufferAttribute(Sprite2DInstancedRes.UVsArray, 2);
        Sprite2DInstancedRes.UVAttriubutes.setUsage(THREE.DynamicDrawUsage);

        Sprite2DInstancedRes.PositionsAttributes = new THREE.InstancedBufferAttribute(Sprite2DInstancedRes.PositionsArray, 3);
        Sprite2DInstancedRes.PositionsAttributes.setUsage(THREE.DynamicDrawUsage);

        Sprite2DInstancedRes.OrientationsAttributes = new THREE.InstancedBufferAttribute(Sprite2DInstancedRes.OrientationsArray, 1);
        Sprite2DInstancedRes.OrientationsAttributes.setUsage(THREE.DynamicDrawUsage);

        Sprite2DInstancedRes.ScalesAttributes = new THREE.InstancedBufferAttribute(Sprite2DInstancedRes.ScalesArray, 3);
        Sprite2DInstancedRes.ScalesAttributes.setUsage(THREE.DynamicDrawUsage);

        Sprite2DInstancedRes.Geometry = new THREE.InstancedBufferGeometry().copy( new THREE.PlaneGeometry(1,1) );

        Sprite2DInstancedRes.Geometry.boundingSphere = new THREE.Sphere( new THREE.Vector3(), 30000 );

        Sprite2DInstancedRes.Sprite = new TextureLoader(roarstar, 608, 1216, 16,16);

        Sprite2DInstancedRes.Material = getInstancedSpriteMat(Sprite2DInstancedRes.Sprite.getTexture());
        

        Sprite2DInstancedRes.Mesh = new THREE.Mesh(
            Sprite2DInstancedRes.Geometry,
            Sprite2DInstancedRes.Material
  
        );

        Sprite2DInstancedRes.Material.needsUpdate = true;

        Sprite2DInstancedRes.Geometry.setAttribute("subUV", Sprite2DInstancedRes.UVAttriubutes);
        Sprite2DInstancedRes.Geometry.setAttribute("pos", Sprite2DInstancedRes.PositionsAttributes);
        Sprite2DInstancedRes.Geometry.setAttribute("angle", Sprite2DInstancedRes.OrientationsAttributes);
        Sprite2DInstancedRes.Geometry.setAttribute("scale", Sprite2DInstancedRes.ScalesAttributes);

        return Sprite2DInstancedRes.Mesh;
    }

    static resetIter(){
        Sprite2DInstancedRes.Iter = 0;
    }

    static updateMatrix(){
        Sprite2DInstancedRes.Geometry.attributes.subUV.needsUpdate = true;
        Sprite2DInstancedRes.Geometry.attributes.pos.needsUpdate = true;
        Sprite2DInstancedRes.Geometry.attributes.angle.needsUpdate = true;
        Sprite2DInstancedRes.Geometry.attributes.scale.needsUpdate = true;
    }
        

    static updateCount(){
        Sprite2DInstancedRes.Geometry.maxInstancedCount = 1;
        Sprite2DInstancedRes.Geometry.instanceCount = Sprite2DInstancedRes.count
    }

    Update(object){
        let rigid = object.rigidbody;
        let iter = Sprite2DInstancedRes.Iter;

        //the static tVec<x> maybe a bad approach, give every renderres its own tvec<x> to use per instance.

        //tVec3.set(rigid.Pos.X,rigid.Pos.Y,-100);
        let posIter = iter * 3;
        Sprite2DInstancedRes.PositionsArray[posIter] = rigid.Pos.X;
        Sprite2DInstancedRes.PositionsArray[posIter+1] = rigid.Pos.Y;
        Sprite2DInstancedRes.PositionsArray[posIter+2] = -100;


        //tVec3.set(this.Scale.X,this.Scale.Y,1);
        
        Sprite2DInstancedRes.ScalesArray[posIter] = this.Scale.x;
        Sprite2DInstancedRes.ScalesArray[posIter+1] = this.Scale.y;
        Sprite2DInstancedRes.ScalesArray[posIter+2] = 1;

        //tVec4.set(0,0, rigid.Orien ,1);
        //let orIter = iter * 4;
        //this.Euler.z = rigid.Orien;
        //this.Quaternion.setFromEuler(this.Euler);
        //Sprite2DInstancedRes.OrientationsArray[orIter] = this.Quaternion.x;
        //Sprite2DInstancedRes.OrientationsArray[orIter+1] = this.Quaternion.y;
        //Sprite2DInstancedRes.OrientationsArray[orIter+2] = this.Quaternion.z;
        //Sprite2DInstancedRes.OrientationsArray[orIter+3] = this.Quaternion.w;

        Sprite2DInstancedRes.OrientationsArray[iter] = rigid.Orien;

        let uvIter = iter * 2
        
        Sprite2DInstancedRes.UVsArray[uvIter] = this.uvcoords.X;
        Sprite2DInstancedRes.UVsArray[uvIter+1] = this.uvcoords.Y;

        Sprite2DInstancedRes.Iter += 1;
       
    }
}
Sprite2DInstancedRes.count = 0;
Sprite2DInstancedRes.MaxCount = 100000;
Sprite2DInstancedRes.Mesh = null;
Sprite2DInstancedRes.Iter = 0;

Sprite2DInstancedRes.UVAttriubutes = null;
Sprite2DInstancedRes.PositionsAttributes = null;
Sprite2DInstancedRes.OrientationsAttributes = null;
Sprite2DInstancedRes.ScalesAttributes = null;

Sprite2DInstancedRes.UVsArray = null;
Sprite2DInstancedRes.PositionsArray = null;
Sprite2DInstancedRes.OrientationsArray = null;
Sprite2DInstancedRes.ScalesArray = null;
Sprite2DInstancedRes.Geometry = null;
Sprite2DInstancedRes.Sprite = null;
Sprite2DInstancedRes.Material = null;

