import { useState, type MouseEvent} from 'react'
import './App.css'

interface Dots {
  x: number,
  y: number 
}

function App() {
  const [dots, setDots] = useState<Dots[]>([])

  const draw = (e: MouseEvent) =>{
    setDots([...dots,  {
      x: e.clientX,
      y: e.clientY
    }])
  }

  // const undo = () => {

  // }

  return (
   <div className="App">
    <div id="button-wrapper">
      <button>Undo</button>
      <button>Redo</button>
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
