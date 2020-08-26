import React from 'react';
import './App.css';
import CrystalBall from './components/CrystalBall';

class App extends React.Component {


  render () {
      return (
      <div className="App">
      <header>
        <h1>Crystal Ball draft</h1>
      </header>
        <main>
          <CrystalBall />
        </main>
      </div>
    );
  }
  
}

export default App;
