import './App.css'
import { useStore } from './store'

function App() {
  const state = useStore();

  return (
    <div className="App">
        <p>boy: {state.boyAge}</p>
        <button onClick={state.addBoyAge}>add boy age</button>
        <p>girl: {state.girlAge}</p>
        <button onClick={state.addGirlAge}>add girl age</button>
    </div>
  )
}

export default App
