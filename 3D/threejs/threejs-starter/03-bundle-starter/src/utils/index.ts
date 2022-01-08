import { PerspectiveCamera, Renderer } from 'three'

// 窗口变动调整
export const onWindowResize = (camera: PerspectiveCamera, renderer: Renderer) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}