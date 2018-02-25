import React from 'react';
import './SearchBar.css';



class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        term: 'meat',
        location: 'new york',
        sortBy: 'best_match'
      };
      this.sortByOptions = {
        'Best Match': 'best_match',
        'Highest Rated': 'rating',
        'Most Reviewed': 'review_count'
      };
      this.handleTermChange = this.handleTermChange.bind(this);
      this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    getSortByClass(sortByOption) {
      return this.state.sortBy === sortByOption ? "active": '';
    }

    handleSortByChange(sortByOption) {
      this.setState({sortBy: sortByOption});
    }

    handleTermChange(event) {
      this.setState({term: event.target.value});
    }

    handleLocationChange(event) {
      this.setState({location: event.target.value});
    }

    renderSortByOptions() {
      return Object.keys(this.sortByOptions).map(sortByOption => {
        let sortByOptionValue = this.sortByOptions[sortByOption];
        return <li key={sortByOptionValue} className={this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind(this, sortByOptionValue)}> {sortByOption}< /li>
      });
    }

    render() {
      return (
        <div className = "SearchBar" >
          <div className = "SearchBar-sort-options" >
            <ul> {this.renderSortByOptions()} </ul>
            <p style={{color: 'white', 'text-align':'center'}}> {this.state.term}-----{this.state.location} -----{this.state.sortBy}</p>
          </div >
          <div className = "SearchBar-fields" >
            <input onChange={this.handleTermChange} placeholder="Search Businesses" / >
            <input onChange={this.handleLocationChange} placeholder = "Where?" / >
          </div>
          <div className = "SearchBar-submit" >
            <a>Let's Go</a>
          </div >
        </div>);
      }
    }

    export default SearchBar
