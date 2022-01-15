import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import * as THREE from 'three'

export const initControl = (
  camera: THREE.PerspectiveCamera,
  render: THREE.Renderer,
  fpsGroup: THREE.Group | THREE.Scene
) => {
  const controls = new PointerLockControls(camera, render.domElement)
  const controlObject = controls.getObject()
  controlObject.position.y = 100
  controlObject.position.x = 20
  fpsGroup.add(controlObject)
  // fpsGroup.scale.set(1.5, 1.5, 1.5)
  return controls
}

export const initKeyControl = (control: PointerLockControls, fpsGroup: THREE.Scene | THREE.Group) => {
  let moveForward = false
  let moveLeft = false
  let moveBackward = false
  let moveRight = false
  let canJump = true
  let spaceUp = true
  const velocity = new THREE.Vector3()
  const direction = new THREE.Vector3()
  const rotation = new THREE.Vector3() //当前的相机朝向
  const upSpeed = 200
  const speed = 500
  const clock = new THREE.Clock()
  const horizontalRaycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(),
    0,
    10
  )
  const downRaycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, -1, 0),
    0,
    5
  )
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
    const controlObject = control.getObject();
    direction.z = +moveForward - +moveBackward
    direction.x = +moveLeft - +moveRight
    direction.normalize()
    const delta = clock.getDelta()
    velocity.x -= velocity.x * 10.0 * delta
    velocity.z -= velocity.z * 10.0 * delta
    velocity.y -= 9.8 * 100.0 * delta // 默认下降的速度
    //将法向量的值归一化
    direction.normalize()

    // 碰撞检测
    rotation
      .copy(controlObject.getWorldDirection(new THREE.Vector3()))
      .multiply(new THREE.Vector3(1, 0, 1))
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
    // normalizeDirection(rotation)
    // console.log(controlObject.getWorldDirection(new THREE.Vector3()))
    horizontalRaycaster.set(controlObject.position, rotation)
    const horizontalIntersections = horizontalRaycaster.intersectObjects(
      fpsGroup.children,
      true
    )
    const horOnObject = horizontalIntersections.length > 0

    // 如果没有碰到东西才能继续走
    if (!horOnObject) {
      if (moveForward || moveBackward)
        velocity.z -= direction.z * speed * delta
      if (moveLeft || moveRight) velocity.x -= direction.x * speed * delta
    }

    // normalizeDirection(velocity)

    // if (controlObject.position.y + velocity.y * delta <= 10) velocity.y = 0

    // 竖直方向碰撞检测
    // 复制相机的位置
    downRaycaster.ray.origin.copy(controlObject.position)
    //获取相机靠下1的位置
    // downRaycaster.ray.origin.y -= 10
    //判断是否停留在了立方体上面
    const intersections = downRaycaster.intersectObjects(fpsGroup.children, true)
    const onObject = intersections.length > 0
    //判断是否停在了立方体上面
    if (onObject === true) {
      velocity.y = Math.max( 0, velocity.y );
      canJump = true;
    }
    // console.log(controlObject.position)
    // console.log(controlObject.position, velocity.z * delta);
    // controlObject.translateX(velocity.x * delta)
    // controlObject.translateY(velocity.y * delta)
    // controlObject.translateZ(velocity.z * delta)
    control.moveForward(-velocity.z * delta);
    control.moveRight(velocity.x * delta);
    controlObject.position.y += velocity.y * delta;

    if (controlObject.position.y < 10) {
      velocity.y = 0
      controlObject.position.y = 10
      canJump = true
    }
  }
}