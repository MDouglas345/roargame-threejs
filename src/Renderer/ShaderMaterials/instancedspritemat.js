import * as THREE from 'three';


export function getInstancedSpriteMat(texture){
    return new THREE.ShaderMaterial( {

        
        vertexShader : `
            
     

            attribute vec4 SubUVwPos;
            attribute vec3 OrienwScale;
            attribute vec4 TextureDetails;

            varying vec2 vertexUV;
            


            vec3 rotatePoint(vec3 pos1, float angle1, vec3 scale1, vec3 offset1){
                vec3 tPos = pos1 * scale1;

                float x = tPos.x;
                float y = tPos.y;

                float cosAngle = cos(angle1);
                float sinAngle = sin(angle1);

                tPos.x = (x * cosAngle) - (y * sinAngle);
                tPos.y = (y * cosAngle) + (x * sinAngle);


                tPos += offset1;

                return tPos;
            }
            

            void main() {

                vec2 tex = vec2(TextureDetails.x / TextureDetails.z, TextureDetails.y / TextureDetails.w) / TextureDetails.xy;

                vertexUV = uv * tex + (vec2(SubUVwPos.x / TextureDetails.z , SubUVwPos.y / TextureDetails.w));
                //vertexUV = uv;

                vec3 vPosition = rotatePoint(position, OrienwScale.x, vec3(OrienwScale.yz,1), vec3(SubUVwPos.zw,-100));
                gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );
                

            }
        `,


        fragmentShader : `
            uniform sampler2D spritesheet;

            varying vec2 vertexUV;
            
            

            void main() {

                gl_FragColor = vec4(texture2D(spritesheet, vertexUV));
                 
                //gl_FragColor = vec4(vertexUV.x, vertexUV.y, 0.0, 1.0);

            }

        `,
        side : THREE.DoubleSide,
        uniforms : {
            spritesheet : { value : texture}
        },
    });
}
