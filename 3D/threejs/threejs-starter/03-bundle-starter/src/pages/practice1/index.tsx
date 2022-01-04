import * as THREE from 'three';
import { useRef, useEffect } from 'react'
import './index.less'

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
    renderer.setClearColor(0xcccccc, 1);
    return renderer;
  }

  const initCamera = () => {
    const width = renderDom?.current?.clientWidth || 100;
    const height = renderDom?.current?.clientHeight || 100;
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 200);
    camera.position.set(0, 30, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);
    return camera;
  }

  const initLight = () => {
    const light = new THREE.DirectionalLight(0xff0220, 1)
    light.position.set(100, 100, 200);
    scene.add(light);
  }

  const initObject = () => {
    const geometry = new THREE.BoxBufferGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    return cube;
  }

  const renderThree = () => {
    const renderer = initRenderer();
    const camera = initCamera();
    initLight();
    const cube = initObject();

    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
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