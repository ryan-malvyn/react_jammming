import React, { Component } from 'react'
import './TrackList.css'
import { Track } from '../'

export default class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(song=>{
          return <Track 
          track={song}
          key={song.id}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
          isRemoval={this.props.isRemoval}
          />
        })
        }
      </div>
    )
  }
}
