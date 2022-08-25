import './App.css';
import React, { Component } from 'react'
import { SearchBar, SearchResults, Playlist} from '../'
import Spotify from '../../Util/Spotify';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []
    }

    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlayListName = this.updatePlayListName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults:searchResults})
    })
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(()=>{
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  updatePlayListName(name){
    this.setState({playlistName:name})
  }

  addTrack(track){
    if(this.state.playlistTracks.find(savedTracks=>savedTracks.id === track.id)){
      return;
    } else {
      this.state.playlistTracks.push(track)
      this.setState({playlistTracks:this.state.playlistTracks})
    }
  }

  removeTrack(track){
    if(this.state.playlistTracks.filter(savedTracks=>savedTracks.id === track.id)){
      this.state.playlistTracks.pop(track)
      this.setState({playlistTracks:this.state.playlistTracks})
    } else {
      return;
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
              <div className="App-playlist">
                
                <SearchResults 
                searchResults={this.state.searchResults} 
                onAdd={this.addTrack}
                 />

                <Playlist 
                playlistName={this.state.playlistName} 
                playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                onChange={this.updatePlayListName}
                onSave={this.savePlaylist}
                />
              </div>
          </div>
    </div>
    )
  }
}

