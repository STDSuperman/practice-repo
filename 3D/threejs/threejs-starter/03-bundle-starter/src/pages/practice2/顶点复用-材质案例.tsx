import React, { useRef, useEffect } from 'react';
import { renderThree, initAxesHelper } from './common';
import * as THREE from 'three';
import './index.less'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/**
 * 练习顶点重复索引复用，材质案例
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
    } = renderThree(renderDom.current!, scene);

    const control = new OrbitControls(camera, renderer.domElement);
    control.enableDamping = true;

    // 顶点索引复用
    const geometry = new THREE.BufferGeometry();

    const attributes = new THREE.BufferAttribute(new Float32Array([
      0, 0, 0, //顶点1坐标
      10, 0, 0, //顶点2坐标
      10, 10, 0, //顶点3坐标
      0, 10, 0, //顶点4坐标
    ]), 3);

    geometry.attributes.position = attributes;

    const indexes = new Uint8Array([
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

    // 点材质
    var geometry1 = new THREE.SphereGeometry(10, 5, 5); //创建一个球体几何对象
    // 创建一个点材质对象
    var material1 = new THREE.PointsMaterial({
      color: 0x0000ff, //颜色
      size: 3, //点渲染尺寸
    });
    //点模型对象  参数：几何体  点材质
    var point = new THREE.Points(geometry1, material1);
    scene.add(point); //网格模型添加到场景中

    // 线材质
    var geometry2 = new THREE.SphereGeometry(20, 10, 10);//球体
    // 直线基础材质对象
    var material2 = new THREE.LineBasicMaterial({
      color: 0x0000ff
    });
    var line = new THREE.Line(geometry2, material2); //线模型对象
    scene.add(line); //点模型添加到场景中

    animate();
  }, []);

  return (
    <div id="render-dom" ref={renderDom}></div>
  )
}