import { useState } from 'react';
import { data } from '@nx-practice/data'

export function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{data()}</p>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

export default App;
