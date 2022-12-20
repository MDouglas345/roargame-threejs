export class Vec2{
  constructor(x,y){
    this.X = x;
    this.Y = y;
  }

  Add(other){
    this.X += other.X;
    this.Y += other.Y;
  }

  rAdd(other){
    let sum = new Vec2(0,0);
    sum.X = this.X + other.X;
    sum.Y = this.Y + other.Y;
    return sum;
  }

  Sub(other){
    this.X -= other.X;
    this.Y -= other.Y;
  }

  rSub(other){
    let sum = new Vec2(0,0);
    sum.X = (this.X - other.X);
    sum.Y = (this.Y - other.Y);
    return sum;
  }

  Mult(other){
    this.X *= other;
    this.Y *= other;
  }

  rMult(other){
    let sum = new Vec2(0,0);
    sum.X = this.X * other;
    sum.Y = this.Y * other;
    return sum;
  }

  Divide(other){
    this.X /= other;
    this.Y /= other;
  }

  rDivide(other){
    let sum = new Vec2(0,0);
    sum.X = this.X / other;
    sum.Y = this.Y / other;
    return sum;
  }

  Dot(other){
    /* Need to freshen up my vector math.*/
  }

  Cross(other){
    let x = (this.X * other.Y) - (this.Y * other.X);
    return x;
  }

  Mag(){
    return (this.X * this.X + this.Y * this.Y);
  }

  MagSqrt(){
    return Math.sqrt(this.Mag());
  }

  Normal(){
    let mag = this.MagSqrt();
    if (mag <= 0){mag = 1;}
    return this.rDivide(mag);
  }
  Normalize(){
    let mag = this.MagSqrt();
    if (mag <= 0){mag = 1;}
    this.Divide(mag);
  }
}

export function Clamp(source, min, max){
  return Math.min(Math.max(source, min), max);
}

export function getRandomInt(max) {
  if (!max){max = 999999;}
  return Math.floor(Math.random() * max);
}

export function getRandomFloat(max){
  if (!max){max = 999999;}
  return (Math.random() * max);
}

export function Lerp(x, y, a){
  return x * (1 - a) + y * a;
}

export function LerpVec(x,y,a){
  let newVec = new Vec2(x.X,x.Y);
  newVec.X = Lerp(newVec.X, y.X, a);
  newVec.Y = Lerp(newVec.Y, y.Y, a);
  return newVec;
}

export function Slerp(vec1, vec2, per){
  let dot = Dot(vec1, vec2);

  dot = Clamp(dot, -1, 1);

  let theta = Math.acos(dot) * per;

  let v3 = vec1.rMult(dot);
  let relative = vec2.rSub(v3);
  relative.Normalize();

  let v4 = vec1.rMult(Math.cos(theta));
  relative.Mult(Math.sin(theta));

  let sum = relative.rAdd(v4);
  return sum;


}

export function InvLerp(x, y, a){
  return (a - x) / (y - x);
}

export function Dot(vec1, vec2){
  return (vec1.X * vec2.X) + (vec1.Y * vec2.Y);
}

export function GetVectorFromAngle(other){
  let vec = new Vec2(0,0);
  vec.X = Math.cos(-other);
  vec.Y = Math.sin(other);

  return vec;
}

export function GetAngleFromVector(vec){
  return Math.atan2(vec.Y, vec.X);
}

export function RotateVecByAngle(vec, angle){
    let dir = new Vec2(0,0);
    dir.X = vec.X * Math.cos(angle) - vec.Y * Math.sin(angle);
    dir.Y = vec.X * Math.sin(angle) + vec.X * Math.cos(angle);
    //console.log(dir, vec, angle);
    return dir
}

export function AngleBetweenVec(vec1, vec2){
  let res = Math.atan2(vec2.Y, vec2.X) - Math.atan2(vec1.Y, vec1.X);
  return res;
}

export function RandomVecInCircle(){
  let theta = getRandomFloat();
  return GetVectorFromAngle(theta);
}

export function Truncate(vector, maxlength){
  if (vector.MagSqrt() > maxlength){
    vector.Normalize();
    vector.Mult(maxlength);
  }
}
export function rTruncate(vector, maxlength){
  if (vector.MagSqrt() > maxlength){
    let vec = vector.Normal();
    vec.Mult(maxlength);
    return vec;
  }
}

export function Cross2D(vec1, vec2){
  let scaler = (vec1.X * vec2.Y) - (vec1.Y * vec2.X);
  return scaler;
}

export function copyInstance(original){
  var copied = Object.assign(
    Object.create(
      Object.getPrototypeOf(original)
    ), original
  );
  return copied;
}
