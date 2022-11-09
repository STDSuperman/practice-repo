import React, { useRef, useEffect } from 'react';
import { renderThree, initAxesHelper } from './common';
import * as THREE from 'three';
import './index.less'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

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

    const textLoader = new THREE.TextureLoader();
    const displayTexture = textLoader.load('/FabricDenim003/FabricDenim003_DISP_1K.jpg');
    const normalTexture = textLoader.load('/FabricDenim003/FabricDenim003_NRM_1K.jpg')
    const glossTexture = textLoader.load('/FabricDenim003/FabricDenim003_GLOSS_1K.jpg')
    const reflectTexture = textLoader.load('/FabricDenim003/FabricDenim003_REFL_1K.jpg')
    const colorTexture = textLoader.load('/FabricDenim003/FabricDenim003_COL_VAR1_1K.jpg')

    const geometry = new THREE.SphereGeometry( 10, 100, 100 );
    const material = new THREE.MeshStandardMaterial( {
      map: colorTexture,
      displacementMap: displayTexture,
      displacementScale: 0.2,
      normalMap: normalTexture,
      // roughnessMap: glossTexture,
      lightMap: glossTexture,
    } );
    geometry.setAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2))
    const sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );

    // const rgbaLoader = new RGBELoader();
    // rgbaLoader.loadAsync('/HdrOutdoorCityPathDayClear001/HdrOutdoorCityPathDayClear001_HDR_1K.exr').then((texture) => {
    //   scene.background = texture;
    // })

    animate();
  }, []);

  return (
    <div id="render-dom" ref={renderDom}></div>
  )
}