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
      this.setState(
        {businesses: businesses,
        loading: true})
    });
  }

  searchGoogleMaps(name, latitude, longitude) {
    GoogleMaps.search(name, latitude, longitude);
  }

  componentWillMount() {
    this.searchYelp(" ", "New York", "rating");
  }

  componentDidMount() {
    this.setState({loading: false})
  }

  render() {
    return (<div className="App">
      <h1>ravenous</h1>
      <LoadSpinner loading={this.state.loading}/>
      <SearchBar searchYelp={this.searchYelp} searchGoogleMaps={this.searchGoogleMaps}/>
      <BusinessList businesses={this.state.businesses} />
    </div>);
  }
}

export default App;
