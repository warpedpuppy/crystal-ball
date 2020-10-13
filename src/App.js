import React from 'react';
import './App.css';
import CrystalBall from './components/CrystalBall';
import CrystalBall2 from './components/CB2/CrystalBall';
import CrystalBall3 from './components/CB3/CrystalBall';
import { Switch, Route } from 'react-router-dom'
class App extends React.Component {


    render() {
        return ( <div className = "App" >
            <main>
            <Switch >
            <Route exact path = "/"
            component = { CrystalBall }
            />
            <Route exact path = "/crystal-ball-2"
            component = { CrystalBall2 }
            />
            <Route exact path = "/crystal-ball-3"
            component = { CrystalBall3 }
            />
            </Switch>
            </main>
            </div>
        );
    }

}

export default App;
