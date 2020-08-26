import React from 'react';
import './App.css';
import CrystalBall from './components/CrystalBall';

class App extends React.Component {


  render () {
      return (
      <div className="App">
        <main>
          <CrystalBall />
        </main>
      </div>
    );
  }
  
}

export default App;
