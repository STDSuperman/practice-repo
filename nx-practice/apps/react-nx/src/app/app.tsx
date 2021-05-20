import { useState } from 'react';
import { data } from '@nx-practice/data'
import axios from 'axios';

export function App() {
  const [message, setMessage] = useState(null);
  axios('/api').then(res => {
    setMessage(res.data.message);
  })
  return (
    <div>
      <p>{data()}</p>
      <p>{message}</p>
    </div>
  );
}

export default App;
