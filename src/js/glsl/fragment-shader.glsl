varying vec2 vUv;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uTextureMap;
uniform float uTime;

const float maxDelay = 0.1;
const float maxDuration = 1.0 - maxDelay;

void main() {
  float delay = (distance(vUv.x, 0.5) / 0.5 + distance(vUv.y, 0.5) / 0.5) / 2.0;
  float progressTime = (sin(uTime / 70.0) + 1.0) / 2.0;
  float progress = clamp(progressTime - delay * maxDelay, 0.0, maxDuration) / maxDuration;

  float noise = snoise(vec3(vUv.x, vUv.y, uTime / 100.0));
  vec4 mapColor = texture2D(uTextureMap, vUv + (noise / 2.0));
  float colorAvg = (((mapColor.r + mapColor.g + mapColor.b) / 3.0) * 2.0) - 1.0;
  vec4 beforeColor = texture2D(uTexture1, vUv + progress * colorAvg);
  vec4 afterColor = texture2D(uTexture2, vUv + (1.0 - progress) * colorAvg);

  gl_FragColor = mix(beforeColor, afterColor, progress);
  // gl_FragColor = vec4(vec3((noise + 1.0) / 2.0), 1.0);
}
