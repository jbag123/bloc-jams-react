import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-name">
      <section id="buttons">
        <button id="previous" onClick={this.props.handlePrevClick} >
          <span className="ion-md-skip-backward"></span>
        </button>
        <button id="play-pause" onClick={this.props.handleSongClick}>
          <span className={this.props.isPlaying ? 'ion-md-pause' : 'ion-md-play'}></span>
        </button>
        <button id="next" onClick={this.props.handleNextClick}>
          <span className="ion-md-skip-forward"></span>
        </button>
      </section>
      <span>{this.props.formatTime(this.props.currentTime)}</span>
      <section id="time-control">
        <input
          type="range"
          className="seek-bar"
          value={(this.props.currentTime / this.props.duration) || 0}
          max="1"
          min="0"
          step="0.01"
          onChange={this.props.handleTimeChange}
        />
        <span>{this.props.formatTime(this.props.duration)}</span>
      </section>
      <section id="volume-control">
        <input
          type="range"
          className="seek-bar"
          value={(this.props.currentVolume)}
          max="1"
          min="0"
          step="0.01"
          onChange={this.props.handleVolumeChange}
        />
      </section>
      </section>
    );
  }
}

export default PlayerBar;
