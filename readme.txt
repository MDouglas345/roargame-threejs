Misc notes on development

Scene and Object Management
Each Scene object will contain a reference to a ThreeJS scene and an array of array of object list for all objects on that scene.
Think of each scene as a level?

When a Scene object need to be predefined (serialization may be needed for some projects), the Scene Object when being loaded, will do the following:
        
        Check if it has a temporary save file for the scene, load and parse that data for objects within that scene
        will replace the layers object inside of the ObjectManager with the Scene's layers.

When a Scene object is being unloaded, the Scene will iterate through each object in its layers and save whatever data is needed
within a data file (An object that needs to save data will need to override SaveData function)


Gameobject persistence
If a gameobject needs to be consistent throughout scene changes, it needs to declare that within its makeup, that way when another scene is being loaded,
the ID of the layer that it was in will be recorded along with the object itself, and be reinserted into the layers after the change has been made.