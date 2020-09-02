import React, { Component } from 'react';
import './CrystalBall.css';
import CrystalBallScript from './CrystalBall.script';

export default class componentName extends Component {

    componentDidMount () {
        CrystalBallScript.init();
    }
  render() {
    return (
      <div id="crystal-ball-unifier">
      <div id="canvas-div"></div>
      <img src='/bmps/bottom-graphic.png' />
      </div>
    );
  }
}
