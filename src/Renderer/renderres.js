import * as THREE from 'three';
import { getInstancedSpriteMat } from './ShaderMaterials/instancedspritemat';
//import testsprite from '../assets/testsprites.png';
//import roarstar from "../assets/star.png";
//import astroid from "../assets/astroid1.png";
import planet from "../assets/planetatlas.png";
import {UniformSpriteTextureLoader} from './TextureLoader/textureloader';
import { Sprite } from 'three';


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

        

        
        this.framecount = 0;

        
        this.framespeed = 1;

        
        

        
    }

     addToScene(scene){
        Sprite2DInstancedRes.count += 1;
    }

    static create(){



        Sprite2DInstancedRes.SubUVwPositionArray = new Float32Array(Sprite2DInstancedRes.MaxCount * 4);
        Sprite2DInstancedRes.OrienwScaleArray = new Float32Array(Sprite2DInstancedRes.MaxCount * 3);
        Sprite2DInstancedRes.TextureDetailsArray = new Float32Array(4*4);

        Sprite2DInstancedRes.TextureDetailsAttributes = new THREE.BufferAttribute(Sprite2DInstancedRes.TextureDetailsArray,4);
        Sprite2DInstancedRes.TextureDetailsAttributes.setUsage(THREE.DynamicDrawUsage);

        Sprite2DInstancedRes.SubUVwPositionAttributes = new THREE.InstancedBufferAttribute(Sprite2DInstancedRes.SubUVwPositionArray, 4);
        Sprite2DInstancedRes.SubUVwPositionAttributes.setUsage(THREE.DynamicDrawUsage);

        Sprite2DInstancedRes.OrienwScaleAttributes = new THREE.InstancedBufferAttribute(Sprite2DInstancedRes.OrienwScaleArray, 3);
        Sprite2DInstancedRes.OrienwScaleAttributes.setUsage(THREE.DynamicDrawUsage);



        Sprite2DInstancedRes.Geometry = new THREE.InstancedBufferGeometry().copy( new THREE.PlaneGeometry(1,1) );

        Sprite2DInstancedRes.Geometry.boundingSphere = new THREE.Sphere( new THREE.Vector3(), 30000 );

        Sprite2DInstancedRes.Sprite = new UniformSpriteTextureLoader(planet, 16000, 700, 160,7);

        Sprite2DInstancedRes.Sprite.setAttribute(Sprite2DInstancedRes.TextureDetailsArray, 4);

        Sprite2DInstancedRes.Material = getInstancedSpriteMat(Sprite2DInstancedRes.Sprite.getTexture());

        Sprite2DInstancedRes.Material.transparent = true;



        Sprite2DInstancedRes.Mesh = new THREE.Mesh(
            Sprite2DInstancedRes.Geometry,
            Sprite2DInstancedRes.Material
  
        );

        Sprite2DInstancedRes.Material.needsUpdate = true;

        Sprite2DInstancedRes.Geometry.setAttribute("TextureDetails", Sprite2DInstancedRes.TextureDetailsAttributes);
        Sprite2DInstancedRes.Geometry.setAttribute("SubUVwPos", Sprite2DInstancedRes.SubUVwPositionAttributes);
        Sprite2DInstancedRes.Geometry.setAttribute("OrienwScale", Sprite2DInstancedRes.OrienwScaleAttributes);

        return Sprite2DInstancedRes.Mesh;
    }

    static resetIter(){
        Sprite2DInstancedRes.Iter = 0;
    }

    static updateMatrix(){
        Sprite2DInstancedRes.Geometry.attributes.SubUVwPos.needsUpdate = true;
        Sprite2DInstancedRes.Geometry.attributes.OrienwScale.needsUpdate = true;
        
    }
        

    static updateCount(){
        Sprite2DInstancedRes.Geometry.maxInstancedCount = 1;
        Sprite2DInstancedRes.Geometry.instanceCount = Sprite2DInstancedRes.count
    }

    Update(object){
        let rigid = object.rigidbody;
        let iter = Sprite2DInstancedRes.Iter;

        let uvposIter = iter * 4;
        Sprite2DInstancedRes.SubUVwPositionArray[uvposIter] = this.uvcoords.X;
        Sprite2DInstancedRes.SubUVwPositionArray[uvposIter+1] = this.uvcoords.Y;
        Sprite2DInstancedRes.SubUVwPositionArray[uvposIter+2] = rigid.Pos.X;
        Sprite2DInstancedRes.SubUVwPositionArray[uvposIter+3] = rigid.Pos.Y;

        let orscaleIter = iter * 3;
        Sprite2DInstancedRes.OrienwScaleArray[orscaleIter] = rigid.Orien;
        Sprite2DInstancedRes.OrienwScaleArray[orscaleIter+1] = this.Scale.x;
        Sprite2DInstancedRes.OrienwScaleArray[orscaleIter+2] = this.Scale.y;


        if (this.framecount > this.framespeed){
            this.uvcoords.X += 1;
            this.uvcoords.X %= (Sprite2DInstancedRes.Sprite.numOfSubTexX); 
            this.framecount = 0;
        }

       
        this.framecount += 1;
        

        Sprite2DInstancedRes.Iter += 1;
       
    }
}
Sprite2DInstancedRes.count = 0;
Sprite2DInstancedRes.MaxCount = 100000;
Sprite2DInstancedRes.Mesh = null;
Sprite2DInstancedRes.Iter = 0;

Sprite2DInstancedRes.SubUVwPositionAttributes = null; // vec4 xy is subuv and zw is position
Sprite2DInstancedRes.OrienwScaleAttributes = null; //vec3 with x being orientation and yz being scale on x and y axis
Sprite2DInstancedRes.TextureDetailsAttributes = null; //vec4 with xy being the dimensions of texture and zw being the subtexture size;

Sprite2DInstancedRes.SubUVwPositionArray = null;
Sprite2DInstancedRes.OrienwScaleArray = null;
Sprite2DInstancedRes.TextureDetailsArray = null;


Sprite2DInstancedRes.Geometry = null;
Sprite2DInstancedRes.Sprite = null;
Sprite2DInstancedRes.Material = null;

