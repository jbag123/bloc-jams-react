import React, { Component } from 'react';
import albumData from './../data/albums.js';

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
      playClass: [],
      hover: false
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

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handlesSongClick(song, index, boo) {
    var playClass = this.state.playClass;
    this.setState({playClass: playClass});
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
      playClass[index] = 'icon ion-md-play';
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
      playClass[index] = 'icon ion-md-pause';

    }
  }

  handleHover(index, boo) {
    var playClass = this.state.playClass;
    this.setState({playClass: playClass});
    if(boo === true) {
      this.setState({ hover: true })
      playClass[index] = 'icon ion-md-play';
    } else {
      this.setState({ hover: false })
      playClass[index] = '';
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
            <tr className="song" onClick={() => this.handlesSongClick(song, index)} onMouseEnter={() => this.handleHover(index, true)} onMouseLeave={() => this.handleHover(index, false)}  key={index}>
              <td>
                <button>
                  <span className={this.state.playClass[index]}>{this.state.playClass[index] ? "" : index+1}</span>
                </button>
              </td>
              <td className="song-title">{song.title}</td>
              <td className="song-duration">{song.duration}</td>
            </tr>
          )}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album;
