import * as THREE from 'three';
import { useRef, useEffect } from 'react'
import './index.less'
import Stats from 'stats.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import dat from 'dat.gui';

/**
 * 绘制一个基础的正方体动画
 */
export default () => {
  const renderDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const gui = new dat.GUI();
    const initRenderer = () => {
      const width = renderDom?.current?.clientWidth || 100;
      const height = renderDom?.current?.clientHeight || 100;
      const renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      renderer.setSize(width, height);
      renderDom?.current?.appendChild(renderer.domElement);
      renderer.setClearColor(0xccffff, 1);
      return renderer;
    }

    const initCamera = () => {
      const width = renderDom?.current?.clientWidth || 100;
      const height = renderDom?.current?.clientHeight || 100;
      const camera = new THREE.PerspectiveCamera(100, width / height, 1, 10000);
      camera.position.set(20, 30, 20);
      camera.up.set(0, 0, 1);
      camera.lookAt(0, 0, 0);
      return camera;
    }

    const initLight = () => {
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

    const initStats = () => {
      const stats = new Stats();
      stats.showPanel(0);
      document.body.appendChild(stats.dom);
      return stats;
    }

    const renderBox = () => {
      const geometry = new THREE.BoxGeometry(10, 10, 10);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0220 });
      const cube = new THREE.Mesh(geometry, material);
      return cube;
    }

    const axesHelper = new THREE.AxesHelper(20);
    scene.add(axesHelper);

    const clock = new THREE.Clock();
    const box = renderBox();
    scene.add(box);
    gui.add(box.position, 'z').min(0).max(20).name('Box Z');
    

    gsap.to(box.position, {
      duration: 3,
      repeat: -1,
      yoyo: true,
      x: 20,
      ease: 'power3.out'
    })

    const renderThree = () => {
      const renderer = initRenderer();
      const camera = initCamera();
      initLight();
      const stats = initStats();

      const control = new OrbitControls(camera, renderer.domElement);

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio)
      })

      control.enableDamping = true;

      const animate = () => {
        // const delta = clock.getDelta();
        // box.position.x += delta * 10;

        // if (box.position.x > 30) {
        //   box.position.x = 0;
        // }

        control.update();
        // frameRender();
        stats.begin();
        renderer.render(scene, camera);
        stats.end();
        requestAnimationFrame(animate);
      }
      animate();
    }
    renderThree();
  }, [])

  return (
    <div id="render-dom" ref={renderDom}></div>
  )
}