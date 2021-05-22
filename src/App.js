// eslint-disable-next-line
import React from 'react';
import './App.css';
import Headers from './components/Headers'

function App() {    
  return (
    <div className="app-main">
      <header className="App-header">
      <h1 style={{textAlign : "center"}}>Bank Branches</h1>
        <Headers />
      </header>
    </div>
  );
}

export default App;
