import React from 'react';
import './LoadSpinner.css';

class LoadSpinner extends React.Component {
  render() {
    return (<div className={`LoadSpinner ${this.props.loading?"loading":"loaded"}`}>
      <h3>Loading!</h3>
    </div>);
  }
}

export default LoadSpinner;
