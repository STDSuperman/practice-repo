import * as THREE from 'three';
import { useRef, useEffect } from 'react'
import './index.less'
import {
  renderBox,
  renderGridLine,
  renderTextureCube,
  renderCoordinate,
  renderWithCanvas,
  renderGrid
} from './render-object'
import Stats from 'stats.js'

export default () => {
  const renderDom = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();
  const initRenderer = () => {
    const width = renderDom?.current?.clientWidth || 100;
    const height = renderDom?.current?.clientHeight || 100;
    const renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(width, height);
    renderDom?.current?.appendChild(renderer.domElement);
    renderer.setClearColor(0xccffff, 1);
    return renderer;
  }

  const initCamera = () => {
    const width = renderDom?.current?.clientWidth || 100;
    const height = renderDom?.current?.clientHeight || 100;
    const camera = new THREE.PerspectiveCamera(100, width / height, 1, 10000);
    camera.position.set(20, 30, 20);
    // camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);
    return camera;
  }

  const initLight = () => {
    // const light = new THREE.DirectionalLight(0xff0220, 1)
    // light.position.set(100, 100, 200);
    // scene.add(light);
    // const light =  new THREE.AmbientLight( 0x404040 );
    // light.position.set(0, 50, 0);
    // scene.add(light);
    const light2 = new THREE.PointLight(0xffffff);
    light2.position.set(0, 50, 0);
    scene.add(light2);
  }

  const initStats = () => {
    const stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild( stats.dom );
    return stats;
  }

  const renderThree = () => {
    const renderer = initRenderer();
    const camera = initCamera();
    initLight();
    const stats = initStats();

    // const frameRender = renderBox(scene);
    // renderGridLine(scene);
    // renderTextureCube(scene);
    renderCoordinate(scene);
    renderWithCanvas(scene);
    renderGrid(scene);

    const animate = () => {
      // frameRender();
      stats.begin();
      renderer.render( scene, camera );
      stats.end();
      requestAnimationFrame( animate );
    }
    animate();
  }

  useEffect(() => {
    renderThree();
  }, [])

  return (
    <div id="render-dom" ref={renderDom}></div>
  )
}