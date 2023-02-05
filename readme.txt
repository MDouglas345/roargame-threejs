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

Moving objects
Threejs's Mesh objects are the way to move things on screen in world space. This means the physics system will need to interact  witht
the Mesh's position member. Same with rotation.

Use and abuse the instancedmesh objects

Reference for instancedmesh frustum culling, if it is needed -> https://discourse.threejs.org/t/how-to-do-frustum-culling-with-instancedmesh/22633

Reference for instancedmesh texture atlasing!! -> https://discourse.threejs.org/t/how-to-apply-offsets-for-texture-atlas-in-instancedmesh/33191/12
Calculating the UV when using the texture atlas :

        Requires each instance know an "ID" for the texture it needs, this will be in the form of a Vec2.
        The unit UV space of a texture in the atlas needs to be calculated : legnthOfTexture / lengthOfAtlas (unitUV)
        The UV space of the atlas needs to be calculated : ID.x * unitUV  (offsetUV)      
        The final UV is caluclated as : vUV * unitUV + offsetUV

Reference for screen to world position -> https://stackoverflow.com/questions/34660063/threejs-converting-from-screen-2d-coordinate-to-world-3d-coordinate-on-the-came

joystick -> https://www.npmjs.com/package/nipplejs


GUI will be handled within Threejs. The size and position of UI elements will be 



Personal note : Apple is an ass. Why force accessibility features on everyone when the majority dont use this.
                Referring to user-scalable=no, no longer works on apple devices ios10+. For some god forsaken reason.
                CSS alternative required.

offload transformation to the cpu when instancing, greatly improves performance and load off the cpu : https://alteredqualia.com/three/examples/webgl_cubes.html
or this for no InstanceMesh assistance : https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry_instancing.html


source for spritetest1 : https://www.spriters-resource.com/fullview/190523/


ughhhh : https://velasquezdaniel.com/blog/rendering-100k-spheres-instantianing-and-draw-calls/
https://github.com/Anemolo/100k-objects-with-Instanced-Geometries/blob/master/src/spheres.js


spritesheet problem that I overlooked : https://gamedev.stackexchange.com/questions/22772/how-can-i-handle-sprite-sheets-with-nonuniform-sprite-dimensions

