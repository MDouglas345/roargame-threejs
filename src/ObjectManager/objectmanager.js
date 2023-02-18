/*
    The primary holder for game objects that need to be updated each frame
*/

import { copyInstance } from "../Utility/utility";
import * as roarengine from "../index.js";


class ObjectManager{
    constructor(){
        this.layers = [[]];
        
    }

    addlayer(){
        this.layers.push([])
    }

    loadScene(objects, scene, uiscene){
        this.layers = []
        var uielements = [];
        var uielementsraw = [];

        objects.InstancedMeshes.forEach((mesh) =>{
          scene.add(mesh)
        });


        objects.layers.forEach((layer) => {
          let newlayer = []

          layer.forEach((item) => {
            var newitem = copyInstance(item);
              if (newitem.UILayer == true){
                newitem.AddToScene(uiscene);
                newitem.addToUIList(uielements, uielementsraw);
            
              }
              else{
                newitem.AddToScene(scene);
              }
              newlayer.push(newitem)
          });

          this.layers.push(newlayer);


        });
        
        /*
        for (let layer in objects.layers){
            let newlayer = []

            for (let item in object.layers[layer]){
                let Item = object.layers[layer
                item.AddToScene(scene);
                newlayer.push(copyInstance(item))
            }

            this.layers.push(newlayer)
        }
        */
        
        roarengine.mRenderer.camera = objects.MainCamera
        roarengine.mRenderer.uicamera = objects.UICamera;
        roarengine.mRenderer.sceneUIElements = uielements;
        roarengine.mRenderer.sceneUIElementsRaw = uielementsraw;
    }

    CleanUp(){
    /*
        Can be optimized by making gameobjects keep track of there location in the layers and when needed to delete,
        push itself into a delete array. Iterate that array and delete the objects,
        instead of asking every object in the scene if it needs to be deleted.
    */
    this.layers.forEach(function(layer, Lindex){
      layer.forEach(function(item, Iindex, array){
        if (item.NeedsDelete){
          item.Delete();
          array.splice(Iindex, 1);
        }
      });
    });
  }

  getObjectByName(name){
    let returnitem = null;
    this.layers.forEach(function(layer, Lindex){
      layer.forEach(function(item, Iindex, array){
        if (item.Name == name){
          returnitem = item;
          return;
        }
      });
      if (returnitem != null){
        return;
      }
    });

    return returnitem;
  }


}


export default ObjectManager;