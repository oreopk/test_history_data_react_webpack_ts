import React,  { useState }  from "react";
import webpackLogo from "../assets/webpack.png";

const App:React.FC = () => {

  const [ count, setCount ] = useState<number>(0);
  const increment = () => setCount(count => count + 1);
  const decrement = () => setCount(count => count - 1);


  return (
    <main>
      <div id="app">
        <img alt="Webpack logo" src={webpackLogo} />
        <h1 className="heading">This is the <span>Home</span> page!</h1>
        <p> Click the buttons below to increment and decrement the count.</p>
    
          <p>Count: {count}</p>
          <button className="btn-primary" onClick={decrement}>Decrement</button>
          <button className="btn-secondary" onClick={increment}>Increment</button>
    
      </div>
    </main>
  );
}

export default App;
