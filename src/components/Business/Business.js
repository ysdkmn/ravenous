import React from 'react';
import './Business.css';

class Business extends React.Component {
  handleSearchGoogleMaps(name, latitude, longitude, url) {
    this.props.searchGoogleMaps(name, latitude, longitude, url);
  }

  render() {
    return (<div className="Business">
      <div className="image-container">
        <a href={this.props.business.googleMapUrl} target="_blank">
          <img src={this.props.business.imageSrc} alt=''/>
        </a>
      </div>
      <h2>{this.props.business.name}</h2>
      <div className="Business-information">
        <div className="Business-address">
          <a href={this.props.business.googleMapUrl} target="_blank">
            <p>{this.props.business.address}</p>
            <p>{this.props.business.city}</p>
            <p>{this.props.business.state} {this.props.business.zipCode}</p>
          </a>
          <a onClick={this.handleSearchGoogleMaps.bind(this, this.props.business.name, this.props.business.latitude, this.props.business.longitude, this.props.business.url)}>
            <p>Website</p>
          </a>
        </div>
        <div className="Business-reviews">
          <h3>{this.props.business.category}</h3>
          <h3 className="rating">{this.props.business.rating} stars</h3>
          <p>{this.props.business.reviewCount} reviews</p>
        </div>
      </div>
    </div>
    );
  }
}

export default Business;
