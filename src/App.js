import React from 'react';
import './App.css';
import CrystalBall from './components/CrystalBall';
import solitaire from './applications/games/solitaire/solitaire';
class App extends React.Component {

  componentDidMount () {
    let s = solitaire;
    s.init();
  }
  render () {
      return (
      <div className="App">
      <header>
        <h1>Crystal Ball Test</h1>
      </header>
        <main>
          <CrystalBall />
        </main>
      </div>
    );
  }
  
}

export default App;
