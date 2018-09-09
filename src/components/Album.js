import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
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
      currentTime: 0,
      duration: album.songs[0].duration,
      currentVolume: 80,
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

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
 }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song, index) {
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

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const index = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[index];
    const activeIndex = this.state.activeIndex === index ? null : index;
    this.setState({activeIndex});
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const index = Math.max(0, currentIndex + 1);
    const newSong = this.state.album.songs[index];
    const activeIndex = this.state.activeIndex === index ? null : index;
    this.setState({activeIndex});
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume =  e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ currentVolume: newVolume });
  }

  formatTime(time) {
    if (isNaN(time) || time === undefined) {
       return '-:--';
    }
    const parsedTime = parseFloat(time);
    const minutes = Math.floor(parsedTime / 60);
    const secs = parsedTime - minutes * 60;
    let roundSecs = Math.floor(secs);
    roundSecs = roundSecs < 10 ? '0' + roundSecs : roundSecs;
    return minutes + ':' + roundSecs;
  }

  render() {
    return (
      <section className="album">
      <Row>
      <Col xs={6}>
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
          <div className="album-details">
            <h2 id="album-title">{this.state.album.title}</h2>
            <h3 className="artist">{this.state.album.artist}</h3>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        </Col>
        <Col xs={6}>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
          {this.state.album.songs.map( (song, index) =>
            <tr className={this.state.activeIndex === index ? 'item-active' : 'inactive'} onClick={() => this.handleSongClick(song, index)} key={index}>
              <td>
                <button>
                  <span className="song">{index+1}</span>
                  <span className="ion-md-play"></span>
                  <span className="ion-md-pause"></span>
                </button>
              </td>
              <td className="song-title">{song.title}</td>
              <td className="song-duration">{this.formatTime(song.duration)}</td>
            </tr>
          )}
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          currentVolume={this.audioElement.currentVolume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime={(time) => this.formatTime(time)}
        />
        </Col>
        </Row>
        </section>

    );
  }
}

export default Album;
