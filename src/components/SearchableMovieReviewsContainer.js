import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'e8Ey8u0HflvGBQGTp5RLxRAdGOmTDnma';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}&query=`;

// Code SearchableMovieReviewsContainer Here
export default class SearchableMovieReviewsContainer extends Component {

  state = {
    reviews: [],
    searchTerm: '',
  }

  fetchMovieReviews(searchTerm) {
    fetch(URL.concat(searchTerm))
      .then(response => response.json())
      .then(result => this.setState({
        reviews: result.results,
      }))
  }

  handleSubmit = event => {
    event.preventDefault()
    this.fetchMovieReviews(this.state.searchTerm)
  }

  handleSearchInputChange = event =>
    this.setState({ searchTerm: event.target.value });

  render() {
    return (
      <div className="SearchAbleMovieReviewsContainer">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search-input">Search Movie Reviews</label>
          <input
            id="search-input" 
            type="text" 
            value={this.state.searchTerm} 
            onChange={this.handleSearchInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        {typeof this.state.reviews === 'object' &&
          this.state.reviews.length > 0 && <h2>Movie Review By Search:</h2>}
        <MovieReviews reviews={this.state.reviews} />
      </div>
    )
  }

  

}
