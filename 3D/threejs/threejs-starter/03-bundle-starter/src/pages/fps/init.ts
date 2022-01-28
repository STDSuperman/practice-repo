import './index.less'
import * as THREE from 'three'
import { RefObject, useEffect } from 'react'
import Stats from 'stats.js'
import { renderCoordinate } from '../practice1/render-object'
import { onWindowResize, normalizeDirection, setRandomColors } from '../../utils'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {
  initCityModel,
  loadPersonSkin,
  loadUSACity,
  loadDreamHouse,
  loadGrass,
  loadMedievalFantasyBook
} from './loadModel'
import { initControl, initKeyControl } from './control'
import { Sky } from 'three/examples/jsm/objects/Sky';

export default (fpsContainerRef: RefObject<HTMLDivElement>) => {
  if (!fpsContainerRef) return;
  const scene = new THREE.Scene()
  const clock = new THREE.Clock()
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
    render.outputEncoding = THREE.sRGBEncoding;
    render.toneMapping = THREE.ACESFilmicToneMapping;
    render.toneMappingExposure = 0.5;
    render.setClearColor(0x8abcd1)
    if (document.querySelector('canvas')) return render;
    fpsContainerRef?.current?.appendChild(render.domElement)
    return render
  }

  const initCamera = () => {
    const height = fpsContainerRef.current?.clientHeight || 100
    const width = fpsContainerRef.current?.clientWidth || 100
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000)
    camera.position.set(0, 0, 0)
    return camera
  }

  const initLight = () => {
    const amLight = new THREE.AmbientLight(0x4792b9)
    fpsGroup.add(amLight)

    const pointLight = new THREE.PointLight(0xffffff)
    pointLight.position.set(0, 100, 0)
    fpsGroup.add(pointLight)
    pointLight.castShadow = true
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

  const initSky = (renderer: THREE.WebGLRenderer) => {

    // Add Sky
    const sky = new Sky();
    sky.scale.setScalar( 450000 );
    scene.add( sky );

    const sun = new THREE.Vector3();

    /// GUI

    const effectController = {
      turbidity: 10,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      elevation: 10,
      azimuth: 180,
      exposure: renderer.toneMappingExposure
    };

    function guiChanged() {
      const uniforms = sky.material.uniforms;
      uniforms[ 'turbidity' ].value = effectController.turbidity;
      uniforms[ 'rayleigh' ].value = effectController.rayleigh;
      uniforms[ 'mieCoefficient' ].value = effectController.mieCoefficient;
      uniforms[ 'mieDirectionalG' ].value = effectController.mieDirectionalG;

      const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation );
      const theta = THREE.MathUtils.degToRad( effectController.azimuth );

      sun.setFromSphericalCoords( 1, phi, theta );

      uniforms[ 'sunPosition' ].value.copy( sun );

      renderer.toneMappingExposure = effectController.exposure;
    }

    guiChanged();
  }

  const start = async () => {
    const render = initRenderer()
    const camera = initCamera()
    const control = initControl(camera, render, scene)
    const frameRender = initKeyControl(control, fpsGroup)
    const stats = initStats()
    initSky(render)
    initLight()
    // initCityModel(fpsGroup, camera)
    // const skinFrame = await loadPersonSkin(fpsGroup, camera);
    renderCoordinate(coordinateGroup)
    // loadUSACity(fpsGroup, camera)
    // loadDreamHouse(fpsGroup, camera)
    // loadGrass(fpsGroup, camera)
    const skinFrame = await loadMedievalFantasyBook(fpsGroup, camera)
    // const control = initOrbitControls(camera, render);

    const animate = () => {
      const delta = clock.getDelta();
      stats.begin()
      render?.render(scene, camera)
      frameRender(delta)
      skinFrame(delta)
      requestAnimationFrame(animate)
      // control.update();
      stats.end()
    }

    animate()

    window.addEventListener('resize', () => {
      onWindowResize(camera, render)
      animate()
    })
  };

  start();
}