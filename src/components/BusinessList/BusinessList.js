import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

class BusinessList extends React.Component {

  render() {
    return (
    <div className="">
      <div className="BusinessList">
        {
          this.props.businesses.map( business => <Business key= {business.id} business={business} searchGoogleMaps={this.props.searchGoogleMaps} />
          )
        }
      </div>
    </div>);
  }
}

export default BusinessList;
