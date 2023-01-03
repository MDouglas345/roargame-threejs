/*
    The primary holder for game objects that need to be updated each frame
*/

import { copyInstance } from "../Utility/utility";

class ObjectManager{
    constructor(){
        this.layers = [];
    }

    addlayer(){
        this.layers.push([])
    }

    loadScene(scene){
        this.layers = []

        for (layer in scene.layer){
            let newlayer = []

            for (item in layer){
                newlayer.push(copyInstance(item))
            }

            this.layers.push(newlayer)
        }
        

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


}


export default ObjectManager;