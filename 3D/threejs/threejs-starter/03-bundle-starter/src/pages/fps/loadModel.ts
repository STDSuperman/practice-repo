import * as THREE from 'three'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export const initCityModel = (scene: THREE.Scene | THREE.Group) => {
  const mtlLoader = new MTLLoader()
  mtlLoader.setPath('/models/')
  mtlLoader.load('city.mtl', material => {
    const objLoader = new OBJLoader()
    objLoader.setMaterials(material)
    objLoader.setPath('/models/')
    objLoader.load('city.obj', object => {
      //设置颜色的取值范围
      const scale = window.chroma.scale(['yellow', '008ae5']);
      // setRandomColors(object, scale)
      // object.scale.set(5, 5, 5);
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