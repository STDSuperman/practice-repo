import * as THREE from 'three';
import Stats from 'stats.js'

export const initRenderer = (renderDom: HTMLElement) => {
  const width = renderDom?.clientWidth || 100;
  const height = renderDom?.clientHeight || 100;
  const renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(width, height);
  renderDom?.appendChild(renderer.domElement);
  renderer.setClearColor(0xccffff, 1);
  return renderer;
}

export const initCamera = (renderDom: HTMLElement) => {
  const width = renderDom?.clientWidth || 100;
  const height = renderDom?.clientHeight || 100;
  const camera = new THREE.PerspectiveCamera(100, width / height, 1, 10000);
  camera.position.set(20, 30, 20);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);
  return camera;
}

export const initLight = (scene: THREE.Scene) => {
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

export const initStats = () => {
  const stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);
  return stats;
}

export const autoResize = (camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio)
  })
}