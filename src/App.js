import React from 'react';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import Yelp from './util/Yelp';


class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        businesses: [ ],
        initial_load: false
      };
      this.searchYelp=this.searchYelp.bind(this);
      this.pageLoadSearch=this.pageLoadSearch.bind(this);
  }

  searchYelp(term, location, sortBy) {
    Yelp.search(term,location,sortBy).then( businesses => this.setState({businesses: businesses}));
  }

  pageLoadSearch() {
    if (!this.state.initial_load) {
      this.searchYelp(" ", "New York", "rating");
      this.setState({initial_load: true});
    }
  }

  render() {
    this.pageLoadSearch();
    return (<div className="App">
      <h1>ravenous</h1>
      <SearchBar searchYelp={this.searchYelp} />
      <BusinessList businesses={this.state.businesses} />
    </div>);
  }
}

export default App;
