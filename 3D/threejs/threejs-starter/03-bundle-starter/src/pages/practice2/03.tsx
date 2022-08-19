import * as THREE from 'three';
import { useRef, useEffect } from 'react'
import './index.less'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {
  initCamera,
  initRenderer,
  initLight,
  initStats,
  autoResize
} from './common';

export default () => {
  const renderDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const axesHelper = new THREE.AxesHelper(20);
    scene.add(axesHelper);

    const renderThree = () => {
      const renderer = initRenderer(renderDom.current!);
      const camera = initCamera(renderDom.current!);
      const light = initLight();
      const stats = initStats();
      scene.add(light);
      autoResize(camera, renderer);

      const control = new OrbitControls(camera, renderer.domElement);
      control.enableDamping = true;

      const geometry = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        
        -1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,

        1.0, 1.0, 0.0,
        1.0, -1.0, 0.0,
        -1.0, 1.0, 0.0,

        1.0, 1.0, 0.0,
        -1.0, 1.0, 0.0,
        1.0, 1.0, 1.0,

        1.0, 1.0, 1.0,
        -1.0, 1.0, 0.0,
        -1.0, 1.0, 1.0,

        1.0, 1.0, 1.0,
        1.0, -1.0, 0.0,
        1.0, 1.0, 0.0,

        1.0, -1.0, 0.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,
      ]);
      geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      const material = new THREE.MeshBasicMaterial({ color: 0xff0220 });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const animate = () => {
        control.update();
        stats.begin();
        renderer.render(scene, camera);
        stats.end();
        requestAnimationFrame(animate);
      }
      animate();
    }
    renderThree();
  }, [])

  return (
    <div id="render-dom" ref={renderDom}></div>
  )
}