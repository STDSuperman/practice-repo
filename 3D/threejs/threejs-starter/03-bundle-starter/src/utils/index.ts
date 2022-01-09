import { PerspectiveCamera, Renderer } from 'three'
import * as THREE from 'three'

// 窗口变动调整
export const onWindowResize = (camera: PerspectiveCamera, renderer: Renderer) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

// 序列化精度
export const normalizeDirection = (
  obj: any
): THREE.Matrix4 | THREE.Vector3 => {
  const keys = Object.keys(obj);
  keys.forEach((key: string) => {
    const val = obj[key];
    obj[key] = Math.abs(val) < 0.01 ? 0 : val;
  });
  return obj;
}

//添加纹理的方法
export function setRandomColors(object: THREE.Object3D, scale: any) {
    //获取children数组
    var children = object.children;

    //如果当前模型有子元素，则遍历子元素
    if (children && children.length > 0) {
        children.forEach(function (e) {
            setRandomColors(e, scale)
        });
    }
    else {
        if (object instanceof THREE.Mesh) {
            //如果当前的模型是楼层，则设置固定的颜色，并且透明化
            if(Array.isArray(object.material)){
                for(var i = 0; i<object.material.length; i++){
                    var material = object.material[i];
                    var color = scale(Math.random()).hex();
                    if (material.name.indexOf("building") === 0) {
                        material.color = new THREE.Color(color);
                        material.transparent = true;
                        material.opacity = 0.7;
                        material.depthWrite = false;
                    }
                }
            }
            // 如果不是场景组，则给当前mesh添加纹理
            else{
                //随机当前模型的颜色
                object.material.color = new THREE.Color(scale(Math.random()).hex());
            }
        }
    }
}