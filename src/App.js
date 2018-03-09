import React from 'react';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import Yelp from './util/Yelp';
import GoogleMaps from './util/GoogleMaps';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        businesses: []
      };
      this.searchYelp=this.searchYelp.bind(this);
      this.searchGoogleMaps=this.searchGoogleMaps.bind(this);
  }

  searchYelp(term, location, sortBy) {
    Yelp.search(term,location,sortBy)
    .then(businesses => businesses.map(business => {
      console.log('map business');
      let name = (business.name);
      let latitude = (business.latitude);
      let longitude = (business.longitude);
      GoogleMaps.search(name, latitude, longitude)
      .then(website => {
        if (website) {
          console.log('add website to business object')
          business.url = website;
        }});
      return business;
    }))
    .then(businesses => {
      console.log(businesses);
      this.setState({businesses: businesses})
    });
  }
      //businesses.map(business => {
      //let website = GoogleMaps.search(business.name, business.latitude, //business.longitude);
      //business.url = website;
      //return businesses;
    //}))
    //.then(businesses => this.setState({businesses: businesses}));


  searchGoogleMaps(name, latitude, longitude) {
    GoogleMaps.search(name, latitude, longitude);
  }

  componentWillMount() {
    this.searchYelp(" ", "New York", "rating");
  }

  render() {
    return (<div className="App">
      <h1>ravenous</h1>
      <SearchBar searchYelp={this.searchYelp} searchGoogleMaps={this.searchGoogleMaps}/>
      <BusinessList businesses={this.state.businesses} />
    </div>);
  }
}

export default App;
