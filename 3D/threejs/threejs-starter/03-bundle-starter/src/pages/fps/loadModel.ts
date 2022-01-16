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


export interface VanguardModelLoadRes {
  mixer: THREE.AnimationMixer;
  model: THREE.Group
}
export const loadPersonSkin = async (
  scene: THREE.Scene | THREE.Group,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new FBXLoader();//创建一个FBX加载器
  const modelSet = (): Promise<VanguardModelLoadRes> => {
    return new Promise((resolve) => {
      loader.load("/models/person-skin/remy.fbx", function(object) {
        loader.load("/models/person-skin/walk.fbx", function(samba) {
          object.scale.set(.1, .1, .1);
          const mixer = new THREE.AnimationMixer(object);
          let animationAction = mixer.clipAction(samba.animations[0]);
          animationAction.loop = THREE.LoopPingPong;
          // animationAction.play()
          scene.add(object);
          resolve({
            model: object,
            mixer: mixer
          });
        })
      })
    })
  }
  const { mixer, model } = await modelSet();
  return (delta: number) => {
    mixer.update(delta);
    model.position.copy(camera.position).add(new THREE.Vector3(0, -35, 3));
    model.rotation.copy(camera.rotation);
    // model.rotation.x = 0;
    // model.rotation.z = 0;
    model.rotation.y += Math.PI;
    // const modelRotation = new THREE.Vector3();
    // modelRotation.copy(camera.getWorldDirection(new THREE.Vector3()))
    // model.rotation.setFromVector3(modelRotation)
  }
}

export const loadUSACity = (
  scene: THREE.Scene | THREE.Group,
  camera: THREE.Camera
) => {
  const loader = new GLTFLoader().setPath('/models/sing_sing_prison_ossining_new_york_usa/' );
  loader.load( 'scene.gltf', ( gltf ) => {
    gltf.scene.scale.set(50, 50, 50)
    scene.add( gltf.scene );
  })
}

export const loadLowPolyCityPack = (
  scene: THREE.Scene | THREE.Group,
  camera: THREE.Camera
) => {
  const loader = new GLTFLoader().setPath('/models/low-poly-city-pack/' );
  loader.load( 'scene.gltf', ( gltf ) => {
    gltf.scene.scale.set(50, 50, 50)
    scene.add( gltf.scene );
  })
}

export const loadDreamHouse = (
  scene: THREE.Scene | THREE.Group,
  camera: THREE.Camera
) => {
  const loader = new GLTFLoader().setPath('/models/the_dream_house/' );
  loader.load( 'scene.gltf', ( gltf ) => {
    gltf.scene.scale.set(40, 40, 40)
    scene.add( gltf.scene );
  })
}

export const loadGrass = (
  scene: THREE.Scene | THREE.Group,
  camera: THREE.Camera
) => {
  const loader = new GLTFLoader().setPath('/models/grass_usd/' );
  loader.load( 'scene.gltf', ( gltf ) => {
    gltf.scene.scale.set(100, 1, 100)
    scene.add( gltf.scene );
  })
}