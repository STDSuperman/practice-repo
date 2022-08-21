import React, { useRef, useEffect } from 'react';
import { renderThree, initAxesHelper } from './common';
import * as THREE from 'three';
import './index.less'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default () => {
  const renderDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    initAxesHelper(scene);
    const {
      camera,
      renderer,
      animate,
    } = renderThree(scene, renderDom.current!);

    const control = new OrbitControls(camera, renderer.domElement);
    control.enableDamping = true;

    for(let i = 0; i < 50; i++) {
      const pointArr = new Float32Array(9);
      const geometry = new THREE.BufferGeometry();
      const color = new THREE.Color(Math.random(), Math.random(), Math.random());
      for (let j = 0; j < 9; j++) {
        pointArr[j] = (Math.random() * 10) - 5;
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(pointArr, 3));
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.5,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    }

    animate();
  }, []);

  return (
    <div id="render-dom" ref={renderDom}></div>
  )
}