uniform float uTime;
uniform sampler2D uTexture;
varying vec2 vUv;

const float PI = 3.141592653589793238462643383279502884197169399375105820;
const float PI2 = 2.0 * PI;

void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
