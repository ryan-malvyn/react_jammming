import React, { Component } from 'react'
import TrackList from '../TrackList/TrackList'
import './SearchResults.css'

export default class SearchResults extends Component {
  render() {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList onAdd={this.props.onAdd} tracks={this.props.searchResults} isRemoval={false} />
        </div>
    )
  }
}
