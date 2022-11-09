import React, { useRef, useEffect } from 'react';
import { renderThree, initAxesHelper } from './common';
import * as THREE from 'three';
import './index.less'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/**
 * 练习顶点重复索引复用
 */
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

    const geometry = new THREE.BufferGeometry();

    const attributes = new THREE.BufferAttribute(new Float32Array([
      0, 0, 0, //顶点1坐标
      10, 0, 0, //顶点2坐标
      10, 10, 0, //顶点3坐标
      0, 10, 0, //顶点4坐标
    ]), 3);

    geometry.attributes.position = attributes;

    const indexes = new Uint16Array([
      // 0对应第1个顶点位置数据、第1个顶点法向量数据
      // 1对应第2个顶点位置数据、第2个顶点法向量数据
      // 索引值3个为一组，表示一个三角形的3个顶点
      0, 1, 2,
      0, 2, 3,
    ]);

    // 索引数据赋值给几何体的index属性
    geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0220,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    animate();
  }, []);

  return (
    <div id="render-dom" ref={renderDom}></div>
  )
}