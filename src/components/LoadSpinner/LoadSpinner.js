import React from 'react';
import './LoadSpinner.css';
import pizza from './pizza.png';

class LoadSpinner extends React.Component {

  render() {
    return (<div className={`LoadSpinner ${this.props.loading?"loading":"loaded"}`}>
      <img src={pizza} />
    </div>);
  }
}

export default LoadSpinner;
