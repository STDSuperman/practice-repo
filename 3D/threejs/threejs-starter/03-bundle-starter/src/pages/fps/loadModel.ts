import * as THREE from 'three'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export const initCityModel = (
  scene: THREE.Scene | THREE.Group,
  camera: THREE.Camera
) => {
  const mtlLoader = new MTLLoader()
  mtlLoader.setPath('/models/city-fps/')
  mtlLoader.load('city.mtl', material => {
    const objLoader = new OBJLoader()
    objLoader.setMaterials(material)
    objLoader.setPath('/models/city-fps/')
    objLoader.load('city.obj', object => {
      //设置颜色的取值范围
      const scale = window.chroma.scale(['yellow', '008ae5']);
      // setRandomColors(object, scale)
      object.scale.set(5, 5, 5);
      // camera.scale.set(1, 1, 1)
      scene.add(object)
    })
  })
}

export const loadTreeHouse = (scene: THREE.Scene | THREE.Group) => {
  const loader = new GLTFLoader().setPath('/models/kgirls01/' );
  loader.load( 'scene.gltf', ( gltf ) => {
    console.log(gltf)
    gltf.scene.scale.x = 10000;
    scene.add( gltf.scene );
  })
}

export const loadCityObj = (scene: THREE.Scene | THREE.Group) => {
  const mtlLoader = new MTLLoader()
  mtlLoader.setPath('/models/city-scene-tokyo/source/Tokyo/')
  mtlLoader.load('city.mtl', material => {
    const objLoader = new OBJLoader()
    objLoader.setMaterials(material)
    objLoader.setPath('/models/city-scene-tokyo/source/Tokyo/')
    objLoader.load('city.obj', object => {
      //设置颜色的取值范围
      const scale = window.chroma.scale(['yellow', '008ae5']);
      // setRandomColors(object, scale)
      object.scale.set(5, 5, 5);
      scene.add(object)
    })
  })
}

export const loadPersonSkin = async (
  scene: THREE.Scene | THREE.Group,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new FBXLoader();//创建一个FBX加载器
  const modelSet = (): Promise<THREE.AnimationMixer> => {
    return new Promise((resolve) => {
      loader.load("/models/person-skin/remy.fbx", function(obj) {
        loader.load("/models/person-skin/walk.fbx", (walkObj) => {
          scene.add(obj)
          obj.scale.set(0.1, 0.1, 0.1);
          // 适当平移fbx模型位置
          const mixer = new THREE.AnimationMixer(obj);
          const animationAction = mixer.clipAction(walkObj.animations[0])
          animationAction.play();
          resolve(mixer);
        })
      })
    })
  }

  const mixer = await modelSet();
  return (delta: number) => {
    mixer.update(delta);
  }
}