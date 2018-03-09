import React from 'react';
import './LoadSpinner.css';

class LoadSpinner extends React.Component {
  render() {
    return (<div>
      <h3 className={this.props.loading?"loading":"loaded"}>Loading!</h3>
    </div>);
  }
}

export default LoadSpinner;
