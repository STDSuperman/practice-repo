import './index.less'
import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import Stats from 'stats.js'
import { renderCoordinate } from '../practice1/render-object'
import { onWindowResize, normalizeDirection, setRandomColors } from '../../utils'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { initCityModel, loadTreeHouse, loadCityObj } from './loadModel'
import { initControl, initKeyControl } from './control'

export default () => {
  const fpsContainerRef = useRef<HTMLDivElement>(null)
  const scene = new THREE.Scene()

  const fpsGroup = new THREE.Group()
  const coordinateGroup = new THREE.Group()
  coordinateGroup.renderOrder = 1000

  scene.add(fpsGroup)
  fpsGroup.add(coordinateGroup)

  const initRenderer = () => {
    const height = fpsContainerRef.current?.clientHeight || 100
    const width = fpsContainerRef.current?.clientWidth || 100
    const render = new THREE.WebGLRenderer({
      antialias: true
    })
    render.setPixelRatio(window.devicePixelRatio)
    render.sortObjects = false
    render.setSize(width, height)
    render.setClearColor(0x8abcd1)
    if (document.querySelector('canvas')) return render;
    fpsContainerRef?.current?.appendChild(render.domElement)
    return render
  }

  const initCamera = () => {
    const height = fpsContainerRef.current?.clientHeight || 100
    const width = fpsContainerRef.current?.clientWidth || 100
    const camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 10000)
    camera.position.set(0, 0, 0)
    return camera
  }

  const initLight = () => {
    const amLight = new THREE.AmbientLight(0xffffff)
    fpsGroup.add(amLight)

    // const pointLight = new THREE.PointLight(0xffffff)
    // pointLight.position.set(0, 150, 0)
    // fpsGroup.add(pointLight)
    // pointLight.castShadow = true
  }

  const initStats = () => {
    const stats = new Stats()
    stats.showPanel(0)
    document.body.appendChild(stats.dom)
    return stats
  }

  const initOrbitControls = (
    camera: THREE.PerspectiveCamera,
    render: THREE.Renderer
  ) => {
    const controls = new OrbitControls(camera, render.domElement)
    controls.maxPolarAngle = (0.9 * Math.PI) / 2
    controls.enableZoom = true
    return controls
  }

  useEffect(() => {
    const render = initRenderer()
    const camera = initCamera()
    const control = initControl(camera, render, scene)
    const frameRender = initKeyControl(control, fpsGroup)
    const stats = initStats()
    initLight()
    // initCityModel(fpsGroup)
    // loadTreeHouse(fpsGroup)
    loadCityObj(fpsGroup)
    renderCoordinate(coordinateGroup)
    // const control = initOrbitControls(camera, render);

    const animate = () => {
      stats.begin()
      render?.render(fpsGroup, camera)
      frameRender()
      requestAnimationFrame(animate)
      // control.update();
      stats.end()
    }

    animate()

    window.addEventListener('resize', () => {
      onWindowResize(camera, render)
      animate()
    })
  }, [])

  const clickBlockPointer = (event: any) => {
    const target: HTMLElement = event.target
    target.requestPointerLock()
  }

  return (
    <div
      className="fps-container"
      onClick={clickBlockPointer}
      ref={fpsContainerRef}
    ></div>
  )
}
