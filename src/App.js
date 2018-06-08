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
    this.searchYelp = this.searchYelp.bind(this);
    this.searchGoogleMaps = this.searchGoogleMaps.bind(this);
  }

  searchYelp(term, location, sortBy) {
    this.setState({loading: true});
    Yelp.search(term, location, sortBy).then(businesses => this.setState({businesses: businesses, loading: false}));
  }

  searchGoogleMaps(name, latitude, longitude, url) {
    this.setState({loading: true});
    GoogleMaps.search(name, latitude, longitude).then(website => {
      if (website) {
        window.open(website);
        this.setState({loading: false});
      } else {
        window.open(url)
        this.setState({loading: false});
        return false
      }
    });
  }

  componentWillMount() {
    this.searchYelp(" ", "New York", "rating");
  }

  render() {
    return (<div className="App">
      <LoadSpinner loading={this.state.loading}/>
      <h1>ravenous</h1>
      <SearchBar searchYelp={this.searchYelp}/>
      <BusinessList businesses={this.state.businesses} searchGoogleMaps={this.searchGoogleMaps}/>
    </div>);
  }
}

export default App;
