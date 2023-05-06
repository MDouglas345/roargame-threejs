import GameObject from "./gameobject.js";
import * as roarengine from "../index.js";

class HTMLUIGameObject extends GameObject{
    constructor(ejslocation){
        super();
        this.EJSHook = null;
        this.HTML = ejslocation();

        this.Rendered = false;
        
    }

    Init(){
        let that = this;
        this.EJSHook = roarengine.mRenderer.EJSHook;

        $.get(this.EJSLocation).then(
            (item) => {
                this.HTML = item;
            }
        )
    }

    Render(){
        if (this.EJSHook == null){
            this.EJSHook = roarengine.mRenderer.EJSHook;
        }
        this.EJSHook.html(ejs.render(this.HTML));
    }

    Unrender(){
        if (this.EJSHook == null){
            this.EJSHook = roarengine.mRenderer.EJSHook;
        }
        this.EJSHook.html("");
    }

    ToggleRender(){
        if (this.Rendered){
            this.Unrender()
            this.Rendered = false;
            return;
        }

        this.Render();
        this.Rendered = true;
    }
}

export default HTMLUIGameObject;