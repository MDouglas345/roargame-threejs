import { Vec2 } from "../Utility/utility.js";


export class Rigidbody{
  constructor(){
    this.Pos = new Vec2(0,0);
    this.Vel = new Vec2(0,0);
    this.Acc = new Vec2(0,0);

    this.Orien = 0;
    this.AngAcc = 0;
    this.AngVel = 0;

    this.PrevAcc;
    this.PrevVel;

    this.Mass = 1;

    this.Parent = null;

    this.State = new ActivePhysicsState(this);

  }

  get Position(){
    return [this.Pos.X,this.Pos.Y];
  }

  set Position(pos){
    this.Pos = pos;
  }

  get Velocity(){
    return [this.Vel.X,this.Vel.Y];
  }

  set Velocity(vel){
    this.Vel = vel;
  }

  get Acceleration(){
    return [this.Acc.X,this.Acc.Y];
  }

  set Acceleration(acc){
    this.Acc = acc;
  }

  get Position(){
    return [this.Pos.X,this.Pos.Y];
  }

  set Position(acc){
    this.Pos = acc;
  }

  AddGrav(g){
    this.Acc.Add(g);
  }
  AddAcc(other){
    this.Acc.Add(other.rDivide(this.Mass));
  }

  AddVel(other){
    this.Vel.Add(other);
  }

  AddTorq(other){
    this.AngAcc += other;
  }

  AddAngVel(other){
    this.AngVel += other;
  }

  ResetAcc(){
    this.Acc.Mult(0);
    this.AngAcc = 0;
  }

  Update(elapsed){
    /*Simple euler integration goes here*/
    /*
    this.Vel.Add(this.Acc.rMult(elapsed));
    this.Pos.Add(this.Vel.rMult(elapsed));

    this.AngVel += this.AngAcc * elapsed;
    this.Orien += this.AngVel * elapsed;
    */
    this.State.Update(elapsed);


  }

  SetParent(other){
    this.Parent = other;
    this.State = new ConnectedToParent(this);
  }

  ConnectToParent(other){
    this.Parent = other;
    this.State = new PartOfPartent(this);
  }

  Enable(){
    this.State = new ActivePhysicsState(this);
  }

  Disable(){
    this.State = new PhysicsState(this);
  }


}

class PhysicsState{
  constructor(Rigid){
    this.RigidMaster = Rigid;
  }

  Update(elapsed){
    this.RigidMaster.Vel = new Vec2(0,0);
    this.RigidMaster.Acc = new Vec2(0,0);
    this.RigidMaster.AngVel = 0;
    this.RigidMaster.AngAcc = 0;
  }
}

class ActivePhysicsState extends PhysicsState{
  constructor(Rigid){
    super(Rigid);
  }

  Update(elapsed){
    this.RigidMaster.Vel.Add(this.RigidMaster.Acc.rMult(elapsed));
    this.RigidMaster.Pos.Add(this.RigidMaster.Vel.rMult(elapsed));

    this.RigidMaster.AngVel += this.RigidMaster.AngAcc * elapsed;
    this.RigidMaster.Orien += this.RigidMaster.AngVel * elapsed;
  }
}

export class ConnectedToParent extends PhysicsState{
  constructor(Rigid){
    super(Rigid);
    //let angdiff = this.RigidMaster.Parent.Rigidbody.Pos.rSub(this.RigidMaster.Pos);

    let angdiff = this.RigidMaster.Pos.rSub(this.RigidMaster.Parent.Center());

    this.AngleOffset = U.GetAngleFromVector(angdiff);

    

    this.MagnitudeDiff = angdiff.MagSqrt();
  }
  Update(elapsed){
    let currentangle = this.RigidMaster.Parent.Rigidbody.Orien  - this.AngleOffset ;
    let pos = U.GetVectorFromAngle(currentangle);
    pos.Mult(this.MagnitudeDiff);
    this.RigidMaster.Pos = pos.rAdd(this.RigidMaster.Parent.Rigidbody.Pos);


  }
}

export class PartOfPartent extends PhysicsState{
  constructor(Rigid){
    super(Rigid);

  }

  Update(elapsed){
    this.RigidMaster.Pos = this.RigidMaster.Parent.Rigidbody.Pos;
    this.RigidMaster.Orien = this.RigidMaster.Parent.Rigidbody.Orien;
  }
}

export class NoRigidbody extends Rigidbody{
  constructor(){
    super();
  }
  Update(){

  }
}
