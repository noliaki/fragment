import { Scene, PerspectiveCamera, WebGLRenderer, Color } from 'three'
import OrbitControls from 'three-orbitcontrols'
import TrackballControls from 'three-trackballcontrols'

import { isPC } from './helper'

export default class ThreeBase {
  public scene: Scene
  public camera: PerspectiveCamera
  public renderer: WebGLRenderer
  public controls: OrbitControls
  public timerId: number | null = null

  constructor() {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      20000
    )
    this.camera.lookAt(this.scene.position)
    this.camera.position.z = 1

    this.renderer = new WebGLRenderer({
      canvas: document.getElementById('app') as HTMLCanvasElement,
      antialias: true
    })
    this.renderer.setClearColor(new Color(0x1a202c))

    this.controls = isPC()
      ? new TrackballControls(this.camera, this.renderer.domElement)
      : new OrbitControls(this.camera, this.renderer.domElement)

    window.addEventListener('resize', () => {
      if (this.timerId) {
        clearTimeout(this.timerId)
      }

      this.timerId = window.setTimeout(() => {
        this.setSize()
      }, 300)
    })

    this.setSize()
    this.tick()
  }

  addToScene(obj) {
    this.scene.add(obj)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  tick() {
    this.controls.update()
    this.render()
  }

  setSize() {
    const width: number = window.innerWidth
    const height: number = window.innerHeight

    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(width, height)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }
}
