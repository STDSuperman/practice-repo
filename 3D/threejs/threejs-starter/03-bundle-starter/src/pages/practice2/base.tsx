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
    } = renderThree(renderDom.current!, scene);

    const control = new OrbitControls(camera, renderer.domElement);
    control.enableDamping = true;

    animate();
  }, []);

  return (
    <div id="render-dom" ref={renderDom}></div>
  )
}