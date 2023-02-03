import * as THREE from 'three';


export function getInstancedSpriteMat(texture){
    return new THREE.ShaderMaterial( {

        uniforms : {
            spritesheet : { value : texture}
        },
        vertexShader : `

            attribute vec2 subUV;
            attribute vec3 pos;
            attribute vec3 scale;
            attribute vec4 orientation;

            varying vec2 vertexUV;
            varying vec3 vPosition;

            

            void main() {
                vPosition = pos + (position * scale);
                vec3 vcV = cross( orientation.xyz, vPosition );
                vPosition = vcV * ( 2.0 * orientation.w ) + ( cross( orientation.xyz, vcV ) * 2.0 + vPosition );
                vertexUV = uv + subUV;
			    gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );

            }
        `,


        fragmentShader : `
            uniform sampler2D spritesheet;

            varying vec2 vertexUV;
            varying vec3 vPosition;
            

            void main() {

                //gl_FragColor = texture2D(spritesheet, vertexUV);
                gl_FragColor = vec4(1.0,0.0,0.0,1.0);

            }

        `,
        side : THREE.DoubleSide
    });
}
