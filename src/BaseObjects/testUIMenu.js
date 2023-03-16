import UIGameObject from "./uigameobject";
import UITestObject from "./uitestobject";
import * as roarengine from "../index.js"
import { Vec2 } from "../Utility/utility";

export class TestUiMenu extends UIGameObject{
    constructor(){
        super();

        this.children = [];


        this.center = null;

        this.children.push(new UITestObject(new Vec2(0,0), new Vec2(500,600), 0xFFFFFF));
        this.children.push(new UITestObject(new Vec2(-150,250), new Vec2(100,50), 0xddFF9F));
        this.children.push(new UITestObject(new Vec2(-150,180), new Vec2(100,50), 0xddFF9F));
        this.children.push(new UITestObject(new Vec2(-150,110), new Vec2(100,50), 0xddFF9F));
        this.children.push(new UITestObject(new Vec2(-150,40), new Vec2(100,50), 0xddFF9F));
        this.children.push(new UITestObject(new Vec2(-150,-30), new Vec2(100,50), 0xddFF9F));
        this.Hide();

    }

    Init(){
        this.offset = new Vec2(roarengine.mRenderer.SCREEN_WIDTH/2, -roarengine.mRenderer.SCREEN_HEIGHT/2);

        super.Init();
        

        this.children.forEach(child =>{
            child.offset.Add(this.offset);
            child.Init();
            
            
        });
    }

    AddToScene(scene){
        this.children.forEach(child => {

            child.AddToScene(scene);
        });
    }


    UpdateGeometry(){
        this.children.forEach(child => {

            child.UpdateGeometry();
        });
    }

    onResize(){

        this.children.forEach(child =>{
            child.rigidbody.Pos.X = child.uicamera.camera.left + child.offset.X;
            child.rigidbody.Pos.Y = child.uicamera.camera.top + child.offset.Y;
        });
        
    }

    addToUIList(uielements, uielementsraw){
        this.children.forEach(child => {
            uielements.push(child);
            uielementsraw.push(child.renderres.mesh);
        });
    }

    Hide(){
        super.Hide();
        this.children.forEach(child =>{
            child.Hide();
        });
    }

    Show(){
        super.Show();
        this.children.forEach(child =>{
            child.Show();
        });
    }
}


