import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'

// 渲染一个正方体
export const renderBox = (scene: THREE.Scene) => {
  const geometry = new THREE.BoxBufferGeometry(10, 10, 10)
  const material = new THREE.MeshLambertMaterial({ color: 0xcccccc })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube);

  const tween = new TWEEN.Tween(cube.position)
  tween.to({x: 10}, 1000).easing(TWEEN.Easing.Quadratic.In).repeat(Infinity).yoyo(true).start();

  return () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    TWEEN.update();
  }
}

// 渲染一个网格
export const renderGridLine = (scene: THREE.Scene) => {
  const geometry = new THREE.BufferGeometry()
  const vertices = new window.Float32Array([
    -30, 0, 0,
    30, 0, 0
  ])
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

  for (let i = 0; i < 20; i++) {
    const line1 = new THREE.Line(
      geometry,
      new THREE.LineDashedMaterial({ color: 0x000000, opacity: 0.2 })
    )

    line1.position.z = i * 10 - 30;

    scene.add(line1)

    const line2 = new THREE.Line(
      geometry,
      new THREE.LineDashedMaterial({ color: 0x000000, opacity: 0.2 })
    )
    line2.position.x = i * 10 - 30
    line2.rotation.y = (90 * Math.PI) / 180
    scene.add(line2)
  }

  scene.add()
}

// 渲染一个带有纹理的正方形
export const renderTextureCube = (scene: THREE.Scene) => {
  const geometry = new THREE.PlaneGeometry(300, 300, 1, 1);
  const vertices = new window.Float32Array([
    0, 0,
    20, 0,
    20, 20,
    0, 20
  ]);
  geometry.setAttribute('uv', new THREE.BufferAttribute(vertices, 2))
  geometry.setAttribute('position', new THREE.BufferAttribute(new window.Float32Array([
    0, 0, 0,
    20, 0, 0,
    0, 0, 20,
    20, 0, 20
  ]), 3))
  new THREE.TextureLoader().load('http://localhost:3000/images/1.jpg', (texture) => {
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  });
}

// 渲染一个坐标轴
export const renderCoordinate = (scene: THREE.Scene) => {
  // 渲染 x 轴
  renderLine(scene, [
    0, 0, 0,
    30, 0, 0
  ], 0xfec3ff);
  // 渲染 y 轴
  renderLine(scene, [
    0, 0, 0,
    0, 30, 0
  ], 0x00a591);
  // 渲染 z 轴
  renderLine(scene, [
    0, 0, 0,
    0, 0, 30
  ], 0xff825e);
}

// 渲染一条线
export const renderLine = (scene: THREE.Scene, vertices: number[], lineColor?: number) => {
  const geometry = new THREE.BufferGeometry();
  const gVertices = new window.Float32Array(
    vertices ?? [
      0, 0, 0,
      20, 0, 0
    ]
  );
  geometry.setAttribute('position', new THREE.BufferAttribute(gVertices, 3));
  const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: lineColor ?? 0x001800, linewidth: 3 }));
  scene.add(line);
}