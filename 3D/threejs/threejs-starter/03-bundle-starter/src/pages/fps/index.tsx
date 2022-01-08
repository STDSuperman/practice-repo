import './index.less'
import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import Stats from 'stats.js'
import { renderCoordinate } from '../practice1/render-object'
import { onWindowResize, normalizePrecision } from '../../utils'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

export default () => {
  const fpsContainerRef = useRef<HTMLDivElement>(null)
  const scene = new THREE.Scene()

  const fpsGroup = new THREE.Group()
  const coordinateGroup = new THREE.Group()
  coordinateGroup.renderOrder = 1000

  scene.add(fpsGroup)
  scene.add(coordinateGroup)

  const clock = new THREE.Clock()
  let moveForward = false
  let moveLeft = false
  let moveBackward = false
  let moveRight = false
  let canJump = true
  let spaceUp = true
  const velocity = new THREE.Vector3(0, 0, 0)
  const direction = new THREE.Vector3(0, 0, 0)
  const upSpeed = 200
  const speed = 500
  const rotation = new THREE.Vector3() //当前的相机朝向
  const horizontalRaycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(),
    0,
    10
  )
  const downRaycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3( 0, -1, 0), 0, 10);
  const helperGroup = new THREE.Group()

  const initRenderer = () => {
    const height = fpsContainerRef.current?.clientHeight || 100
    const width = fpsContainerRef.current?.clientWidth || 100
    const render = new THREE.WebGLRenderer({
      antialias: true
    })
    render.setPixelRatio( window.devicePixelRatio );
    render.sortObjects = false;
    render.setSize(width, height)
    render.setClearColor(0x8abcd1)
    if (document.querySelector('canvas')) render
    fpsContainerRef?.current?.appendChild(render.domElement)
    return render
  }

  const initCamera = () => {
    const height = fpsContainerRef.current?.clientHeight || 100
    const width = fpsContainerRef.current?.clientWidth || 100
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
    camera.position.set(0, 0, 0)
    camera.lookAt(0, 0, 0)
    return camera
  }

  const initLight = () => {
    const amLight = new THREE.AmbientLight(0x404040)
    fpsGroup.add(amLight)

    const pointLight = new THREE.PointLight(0xffffff)
    pointLight.position.set(0, 10, 0)
    fpsGroup.add(pointLight)
    pointLight.castShadow = true
  }

  const initStats = () => {
    const stats = new Stats()
    stats.showPanel(0)
    document.body.appendChild(stats.dom)
    return stats
  }

  const initControl = (
    camera: THREE.PerspectiveCamera,
    render: THREE.Renderer
  ) => {
    const controls = new PointerLockControls(camera, render.domElement)
    const control = controls.getObject()
    control.position.y = 50
    control.position.x = 100
    fpsGroup.add(control)
    return control
  }

  const initModel = () => {
    const mtlLoader = new MTLLoader()
    mtlLoader.setPath('/models/')
    mtlLoader.load('city.mtl', material => {
      const objLoader = new OBJLoader()
      objLoader.setMaterials(material)
      objLoader.setPath('/models/')
      objLoader.load('city.obj', object => {
        fpsGroup.add(object)
      })
    })

    //添加辅助线
    const up = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), 10, 0x00ff00);
    const horizontal = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 10, 0x00ffff);
    const down = new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0), new THREE.Vector3(), 10, 0xffff00);

    helperGroup.add(up);
    helperGroup.add(horizontal);
    helperGroup.add(down);

    scene.add(helperGroup);
  }

  const initKeyControl = (control: THREE.Camera) => {
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 38: // up
        case 87: // w
          moveForward = true
          break
        case 37: // left
        case 65: // a
          moveLeft = true
          break
        case 40: // down
        case 83: // s
          moveBackward = true
          break
        case 39: // right
        case 68: // d
          moveRight = true
          break
        case 32: // space
          if (canJump && spaceUp) velocity.y += upSpeed
          canJump = false
          spaceUp = false
          break
      }
    }
    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 38: // up
        case 87: // w
          moveForward = false
          break
        case 37: // left
        case 65: // a
          moveLeft = false
          break
        case 40: // down
        case 83: // s
          moveBackward = false
          break
        case 39: // right
        case 68: // d
          moveRight = false
          break
        case 32: // space
          spaceUp = true
          break
      }
    }
    document.addEventListener('keydown', onKeyDown, false)
    document.addEventListener('keyup', onKeyUp, false)
    return () => {
      direction.z = +moveForward - +moveBackward
      direction.x = +moveLeft - +moveRight
      direction.normalize()
      const delta = clock.getDelta()
      velocity.x -= velocity.x * 10.0 * delta
      velocity.z -= velocity.z * 10.0 * delta
      velocity.y -= 9.8 * 100.0 * delta // 默认下降的速度
      //将法向量的值归一化
      direction.normalize();

      helperGroup.position.set(control.position.x,control.position.y,control.position.z);

      // 碰撞检测
      rotation
        .copy(control.getWorldDirection(new THREE.Vector3()))
        .multiply(new THREE.Vector3(-1, 0, -1))
      const m = new THREE.Matrix4()

      // 大于零说明是往前
      if (direction.z > 0) {
        if (direction.x > 0) {
          m.makeRotationY(Math.PI / 4)
        } else if (direction.x < 0) {
          m.makeRotationY(-Math.PI / 4)
        } else {
          m.makeRotationY(0)
        }
      } else if (direction.z < 0) {
        if (direction.x > 0) {
          m.makeRotationY((Math.PI / 4) * 3)
        } else if (direction.x < 0) {
          m.makeRotationY((-Math.PI / 4) * 3)
        } else {
          m.makeRotationY(Math.PI)
        }
      } else {
        if (direction.x > 0) {
          m.makeRotationY(Math.PI / 2)
        } else if (direction.x < 0) {
          m.makeRotationY(-Math.PI / 2)
        }
      }

      // 设置 rotation 的方向
      rotation.applyMatrix4(m)
      horizontalRaycaster.set(control.position, rotation);
      const horizontalIntersections = horizontalRaycaster.intersectObjects( scene.children, true);
      const horOnObject = horizontalIntersections.length > 0;

      // 如果没有碰到东西才能继续走
      if (!horOnObject) {
        if (moveForward || moveBackward) velocity.z -= direction.z * speed * delta
        if (moveLeft || moveRight) velocity.x -= direction.x * speed * delta
      }

      velocity.x = normalizePrecision(velocity.x);
      velocity.y = normalizePrecision(velocity.y);
      velocity.z = normalizePrecision(velocity.z);

      if (control.position.y + velocity.y * delta < 10) velocity.y = 0

      // 竖直方向碰撞检测
      // 复制相机的位置
      downRaycaster.ray.origin.copy( control.position );
      //获取相机靠下10的位置
      downRaycaster.ray.origin.y -= 10;
      //判断是否停留在了立方体上面
      const intersections = downRaycaster.intersectObjects( scene.children, true);
      const onObject = intersections.length > 0;
      //判断是否停在了立方体上面
      if ( onObject) {
        velocity.y = Math.max( 0, velocity.y );
        canJump = true;
      }

      control.translateX(velocity.x * delta)
      control.translateY(velocity.y * delta)
      control.translateZ(velocity.z * delta)

      if (control.position.y < 10) {
        velocity.y = 0
        control.position.y = 10
        canJump = true
      }
    }
  }

  const initOrbitControls = (
    camera: THREE.PerspectiveCamera,
    render: THREE.Renderer
  ) => {
    const controls = new OrbitControls(camera, render.domElement)
    controls.maxPolarAngle = (0.9 * Math.PI) / 2
    controls.enableZoom = true
    return controls
  }

  useEffect(() => {
    const render = initRenderer()
    const camera = initCamera()
    const control = initControl(camera, render)
    const frameRender = initKeyControl(control)
    const stats = initStats()
    initLight()
    initModel()
    renderCoordinate(coordinateGroup)
    // const control = initOrbitControls(camera, render);

    const animate = () => {
      stats.begin()
      render?.render(fpsGroup, camera)
      frameRender()
      requestAnimationFrame(animate)
      // control.update();
      stats.end()
    }

    animate()

    window.addEventListener('resize', () => {
      onWindowResize(camera, render)
      animate()
    })
  })

  const clickBlockPointer = (event: any) => {
    const target: HTMLElement = event.target
    target.requestPointerLock()
  }

  return (
    <div
      className="fps-container"
      onClick={clickBlockPointer}
      ref={fpsContainerRef}
    ></div>
  )
}
