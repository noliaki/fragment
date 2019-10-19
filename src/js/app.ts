import { Mesh, AxesHelper } from 'three'

import ThreeBase from './ThreeBase'
import material from './particle-material'
import geometry from './particle-geometry'

let time: number = 0

const base: ThreeBase = new ThreeBase()

if (process.env.NODE_ENV === 'development') {
  const axes = new AxesHelper(1000)
  base.addToScene(axes)
}

const mesh: Mesh = new Mesh(geometry, material)
base.addToScene(mesh)
loop()

function loop(): void {
  material.uniforms.uTime.value = ++time
  base.tick()
  requestAnimationFrame(loop)
}
