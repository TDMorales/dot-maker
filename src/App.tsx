import { useState, type MouseEvent} from 'react'
import './App.css'

interface Dots {
  x: number,
  y: number 
}

function App() {
  const [dots, setDots] = useState<Dots[]>([])
  const [cache, setCache] = useState<Dots[]>([])

  const draw = (e: MouseEvent) =>{
    setDots([...dots,  {
      x: e.clientX,
      y: e.clientY
    }])
  }

  const undo = () => {
    if(dots.length > 0){
      const newDots = [...dots]
      const lastDot = newDots.pop() as Dots
      Promise.all([
        setCache([...cache, lastDot]),
        setDots(newDots)
      ])
    }
  }

  const redo = () => {
    if(cache.length > 0){
      const newCache = [...cache]
      const lastCacheItem = newCache.pop() as Dots
      Promise.all([
        setDots([...dots, lastCacheItem]),
        setCache(newCache)
      ])
    }

  }

  return (
   <div className="App">
    <div id="button-wrapper">
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
    <div id="click-area" onClick={draw}>
      {dots.map(({x, y}: Dots, i: number) => (
        <div key={`dot-${i}`} className="dot" style={{left: x, top: y}}/>
      ))}
    </div>
   </div>
  )
}

export default App
