import * as m from '../index'
import { Vec2 } from '../Utility/utility.js';

export class PhysicsSystem{
  constructor(){
    this.m_gravity = new Vec2(0,0);
    this.m_GlobalForces = new Vec2(0,0);
    this.ObjectHandleInstance = m.mObjectManager;

  }

  get Gravity(){
    return [this.m_gravity.X, this.m_gravity.Y];
  }

  get GlobalForces(){
    return [this.m_GlobalForces.X, this.m_GlobalForces.Y];
  }

  set Gravity(g){
    this.m_gravity = g;
  }

  set GloblalForces(g){
    this.m_GlobalForces = g;
  }

  Test(){
    //console.log(this.entites);
    this.entities.forEach(item =>{
      console.log(item.Name);
    });
  }

  Update(elapsed){
    /*this.entities.forEach(item =>{
      //console.log(item);

      item.Rigidbody.AddGrav(this.m_gravity);
      item.Rigidbody.AddAcc(this.m_GlobalForces);

      item.Rigidbody.Update(elapsed);

      item.Rigidbody.ResetAcc();

    });
    */

    this.ObjectHandleInstance.m_Entities.forEach(layer =>{
      layer.forEach(item =>{
        item.Rigidbody.AddGrav(this.m_gravity);
        item.Rigidbody.AddAcc(this.m_GlobalForces);

        item.Rigidbody.Update(elapsed);

        item.Rigidbody.ResetAcc();
      });
    });
  }
}
