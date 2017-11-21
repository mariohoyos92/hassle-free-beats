import React, { Component } from "react";

import "./MusicStore.css";

class MusicStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlist: [],
      activeMusicIndex: 0,
      leftTime: 0,
      progress: 0,
      volume: 1,
      totalPrice: 0,
      cart: [],
      play: false
    };
  }

  componentDidMount() {
    const audioContainer = this.audioContainer;
    audioContainer.addEventListener(
      "timeupdate",
      this.updateProgress.bind(this)
    );
    audioContainer.addEventListener("ended", this.end.bind(this));
  }
  componentWillUnmount() {
    const audioContainer = this.audioContainer;
    audioContainer.removeEventListener(
      "timeupdate",
      this.updateProgress.bind(this)
    );
    audioContainer.removeEventListener("ended", this.end.bind(this));
  }

  updateProgress() {
    const duration = this.audioContainer.duration;
    const currentTime = this.audioContainer.currentTime;
    const progress = currentTime / duration;
    this.setState({
      progress: progress,
      leftTime: duration - currentTime
    });
  }

  end() {
    this.handleNext();
  }

  handleToggle() {
    this.state.play ? this.audioContainer.pause() : this.audioContainer.play();
  }

  handlePrev() {
    const { activeMusicIndex } = this.state;
    const total = this.state.playlist.length;
    const index = activeMusicIndex > 0 ? activeMusicIndex - 1 : total - 1;
    this._playMusic(index);
  }

  handleNext() {
    const { activeMusicIndex } = this.state;
    const total = this.state.playlist.length;
    const index = activeMusicIndex < total - 1 ? activeMusicIndex + 1 : 0;
    this._playMusic(index);
  }

  _playMusic(index) {
    this.setState(
      {
        activeMusicIndex: index,
        leftTime: 0,
        play: true,
        progress: 0
      },
      () => {
        this.audioContainer.currentTime = 0;
        this.audioContainer.play();
      }
    );
  }

  _formatTime(time) {
    if (isNaN(time) || time === 0) {
      return;
    }
    const mins = Math.floor(time / 60);
    const secs = (time % 60).toFixed();
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  render() {
    const { playlist } = this.props;
    const { activeMusicIndex } = this.state;
    const activeMusic = playlist[activeMusicIndex];
    const progressStyle = {
      width: `${this.state.progress * 100}%`,
      backgroundColor: "red"
    };

    const storeItems = playlist.map(track => (
      <div className="store-item">
        <div className="store-item-left">
          <h4>{track.title}</h4>
          <h5>{track.artist}</h5>
        </div>
        <div className="store-item-right">
          <span>$10.00</span>
          <button> Add To Cart </button>
        </div>
      </div>
    ));

    return (
      <div className="store-container">
        <audio
          autoPlay={this.state.play}
          preload="auto"
          ref={ref => {
            this.audioContainer = ref;
          }}
          src={activeMusic.url}
        />
        <div className="store-header">
          <div className="store-header-left">
            <img
              className="store-logo"
              src="https://s3.us-east-2.amazonaws.com/hassle-free-beats-untagged-audio/header-logo.png"
              alt="logo"
            />
            <p>{`Total Beats: ${playlist.length}  `}</p>

            <p>Total Plays: 2.1M </p>
          </div>
          <div className="store-header-right">
            <span>${10 * this.state.cart.length}.00</span>
            <span>Icon Button</span>
            <span>Checkout Button</span>
          </div>
        </div>
        <div className="beats-container">{storeItems}</div>
        <div className="player-controls" />
      </div>
    );
  }
}

export default MusicStore;
