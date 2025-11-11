import { useEffect, useState } from 'react'
import UseRefDemo from '../components/UseRefDemo'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (count > 0) {
      setMessage(`Count is now ${count}`);
    } else {
      setMessage('Start clicking');
    }
  }, [count]);

  return (
    <>
      <div>
        <h1>React Hooks with TypeScript</h1>
        <h1>{count}</h1>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <p>{message}</p>

        <hr/>
        <UseRefDemo />
      </div>

    </>
  )
}

export default App
