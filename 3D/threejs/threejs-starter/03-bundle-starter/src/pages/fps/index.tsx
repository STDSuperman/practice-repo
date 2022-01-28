import './index.less'
import { useRef, useEffect } from 'react'
import initThree from './init'

export default () => {
  const fpsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    initThree(fpsContainerRef);
  }, [])

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
