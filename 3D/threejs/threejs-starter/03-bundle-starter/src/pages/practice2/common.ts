import * as THREE from 'three';
import Stats from 'stats.js'

export interface IDefaultEleConfig {
  light?: boolean;
  autoResize?: boolean;
  stats?: boolean;
}

export interface IRenderThreeExportObj {
  light?: THREE.Light;
  animate: (frameRender?: () => void) => void;
  camera: THREE.PerspectiveCamera;
  stats?: Stats;
  renderer: THREE.WebGLRenderer;
}

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

export const initLight = () => {
  // const light = new THREE.DirectionalLight(0xff0220, 1)
  // light.position.set(100, 100, 200);
  // scene.add(light);
  // const light =  new THREE.AmbientLight( 0x404040 );
  // light.position.set(0, 50, 0);
  // scene.add(light);
  const light2 = new THREE.PointLight(0xffffff, 0.5);
  light2.position.set(0, 50, 0);
  return light2;
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

export const initAxesHelper = (scene: THREE.Scene | THREE.Group,) => {
  const axesHelper = new THREE.AxesHelper(20);
  scene.add(axesHelper);

  const axesHelperMarkText = document.getElementById('axesHelperMarkText');
  if (!axesHelperMarkText) {
    const markFragmentHtml = `
    <div
      style="position: absolute; top: 0; left: 50%; display: flex; width: 200px; justify-content: space-around;transform: translateX(-50%)"
      id="axesHelperMarkText"
    >
      <div>红色：x</div>
      <div>绿色：y</div>
      <div>蓝色：z</div>
    </div>
    `
    const div = document.createElement('div');
    div.innerHTML = markFragmentHtml;
    document.body.appendChild(div);
  } 

  return axesHelper;
}

export const renderThree = (
  renderDom: HTMLElement,
  scene: THREE.Scene | THREE.Group,
  defaultEleConfig?: IDefaultEleConfig
) => {
  const eleConfig = Object.assign({
    light: true,
    stats: true,
    autoResize: true,
  }, defaultEleConfig || {})

  const renderer = initRenderer(renderDom);
  const camera = initCamera(renderDom);
  let stats: Stats;

  const animate = (frameRender?: () => void) => {
    stats?.begin();
    frameRender?.();
    renderer.render(scene, camera);
    stats?.end();
    requestAnimationFrame(() => {
      animate(frameRender);
    });
  }

  const exportObj: IRenderThreeExportObj = {
    renderer,
    camera,
    animate,
  };

  if (eleConfig.light) {
    const light = initLight();
    scene.add(light);
    exportObj.light = light;
  }

  if (eleConfig.stats) {
    const stats = initStats();
    exportObj.stats = stats;
  }
  autoResize(camera, renderer);

  return exportObj;
}