/* Should only contain and manage game objects */

/*
  This File is responsibe for giving gameobjects information for their update Function
  All internal systems will congregate here.
  Done : PhysicsSystem
  ToDo : ParticleSystem
*/
/*
  Need to implement a quadtree to help with collision detection performance
*/

import * as m from '../index'



export class GameSystem{
  //static Entities = ObjectManager.Entities;
  constructor(){
    
  }

  Init(){

    this.ObjectHandleInstance = m.mObjectManager;

    //this.Physics = new PS.PhysicsSystem();

    //this.QuadTree = new QT.QuadTree(this.m_Player);

    //this.CollisionHandler = new CH.CollisionHandler(this.QuadTree);

    

    


    this.ObjectHandleInstance.layers.forEach(layer =>{
      layer.forEach(item =>{
        item.Init();
      });
    });

  }

  BattleTest(){
    for (let i = 0; i < 5; i++){
      let p = new EnemyScouter();
      Game.AddObject(p);
    }
  }

  EarlyUpdate(elapsed){
    this.ObjectHandleInstance.layers.forEach(layer =>{
      layer.forEach(item =>{
        item.EarlyUpdate(elapsed);
      });
    });
  }

  Update(elapsed){
    //console.log(this.m_Player.Rigidbody.Pos);
    //console.log(this.ObjectHandleInstance.m_Entities[2]);
    /*
    Stages to go through in order
    1. Rigidbody Update
    2. Collision Detection and correction
    3. Game Elements update?
    */


    /*
    Rigidbody update
    instead, gonna create a dedicated physics class that will go through all
    gameobjects and calling their rigidbody update and passing args
    The idea being that all objects could have a rigidbody or not and will update accordingly
    */

    //this.Physics.Update(elapsed);

    //this.QuadTree.CreateTree();



    //this.CollisionHandler.CheckCollisions();

    this.ObjectHandleInstance.layers.forEach(layer =>{
      layer.forEach(item =>{
        item.Update(elapsed);
      });
    });

    /*
    Collision detection and correction
    */



  }

  LateUpdate(elapsed){
    this.ObjectHandleInstance.layers.forEach(layer =>{
      layer.forEach(item =>{
        item.LateUpdate(elapsed);
      });
    });

    //Delete cycle
  //console.log(this.ObjectHandleInstance.m_Entities);
  this.ObjectHandleInstance.CleanUp();

  //this.QuadTree.ClearTree();

  //console.log(this.ObjectHandleInstance.m_Entities);


  }


   GetObjectByName(name){
    /*
    this.Entities.forEach(item =>{
      if (item.Name === name){console.log(item);return item;}

    });
    */

    /*for (let i = 0; i < this.Entities.length; i++){
      if (this.Entities[i].Name === name){return this.Entities[i];}
    }

    return null;
    */

    return M.OManager.GetObjectByName(name);
  }

   AddObject(object){
    /*
    this.Entities.push(object);
    Renderer.AddObject(object);
    */
   this.ObjectHandleInstance.AddObject(object);



  }


}


export default GameSystem
