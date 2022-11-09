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
    } = renderThree(renderDom.current!, scene, {
      light: false,
    });

    const control = new OrbitControls(camera, renderer.domElement);
    control.enableDamping = true;

    // 绘制一个球
    const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
    const material = new THREE.MeshStandardMaterial();
    const sphereMesh = new THREE.Mesh(sphereGeometry, material);
    sphereMesh.position.set(0, 0, 2);
    scene.add(sphereMesh);

    // 绘制一个平面
    const planeGeometry = new THREE.PlaneBufferGeometry(10, 10);
    const planeMesh = new THREE.Mesh(planeGeometry, material);
    planeMesh.position.set(0, 0, 0)
    scene.add(planeMesh);

    // 添加灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionLight.position.set(10, 10, 10);
    scene.add(directionLight);

    planeMesh.receiveShadow = true;
    sphereMesh.castShadow = true;
    directionLight.castShadow = true;
    renderer.shadowMap.enabled = true;

    animate();
  }, []);

  return (
    <div id="render-dom" ref={renderDom}></div>
  )
}