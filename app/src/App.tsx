import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const pingBackend = async (): Promise<any[] | undefined> => {
    let productsResponse;
    await fetch('/api/products/gloves')
      .then((response) => response.json())
      .then((data) => {
        console.log('data ', data);
        productsResponse = data;
        return productsResponse;
      })
      .catch((err) => {
        console.error(
          'Error occurred while requesting /api/products/gloves',
          err
        );
        productsResponse = undefined;
      });
    return productsResponse;
  };

  useEffect(() => {
    pingBackend();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
