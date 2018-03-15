import React from 'react';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import Yelp from './util/Yelp';
import GoogleMaps from './util/GoogleMaps';
import LoadSpinner from './components/LoadSpinner/LoadSpinner';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        businesses: [],
        loading: false
      };
      this.searchYelp=this.searchYelp.bind(this);
      this.searchGoogleMaps=this.searchGoogleMaps.bind(this);
  }

  searchYelp(term, location, sortBy) {
    this.setState({loading: true});
    Yelp.search(term,location,sortBy)
    .then(businesses => businesses.map(business => {
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
    .then(businesses => this.setState({
      businesses: businesses,
      loading: false
    }));
  }

  searchGoogleMaps(name, latitude, longitude) {
    GoogleMaps.search(name, latitude, longitude);
  }

  componentWillMount() {
    this.searchYelp(" ", "New York", "rating");
  }

  render() {
    return (<div className="App">
      <LoadSpinner loading={this.state.loading} />
      <h1>ravenous</h1>
      <SearchBar
        searchYelp={this.searchYelp}
        searchGoogleMaps={this.searchGoogleMaps} />
      <BusinessList businesses={this.state.businesses} />
    </div>);
  }
}

export default App;
