import React, { Component } from 'react';
import albumData from './../data/albums.js';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
         return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[1],
      isPlaying: false,
      activeIndex: null
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audiosrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  prev(song) {
    this.setState({ currentSong: song-- });
    this.audioElement.play();
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handlesSongClick(song, index) {
    const isSameSong = this.state.currentSong === song;
    const activeIndex = this.state.activeIndex === index ? null : index;
    this.setState({activeIndex});
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (isSameSong) {
      this.prev(song);
    }
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
          {this.state.album.songs.map( (song, index) =>
            <tr className={this.state.activeIndex === index ? 'item-active' : 'inactive'} onClick={() => this.handlesSongClick(song, index)} key={index}>
              <td>
                <button>
                  <span className="song">{index+1}</span>
                  <span className="ion-md-play"></span>
                  <span className="ion-md-pause"></span>
                </button>
              </td>
              <td className="song-title">{song.title}</td>
              <td className="song-duration">{song.duration}</td>
            </tr>
          )}
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick(this.state.currentSong)}
        />
      </section>
    );
  }
}

export default Album;
