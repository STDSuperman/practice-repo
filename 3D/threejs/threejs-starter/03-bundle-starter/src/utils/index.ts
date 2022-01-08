import { PerspectiveCamera, Renderer } from 'three'

// 窗口变动调整
export const onWindowResize = (camera: PerspectiveCamera, renderer: Renderer) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

// 序列化精度
export const normalizePrecision = (num: number): number => {
  return Math.abs(num) < 0.01 ? 0 : num;
}