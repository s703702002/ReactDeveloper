import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeString: '00:00:00',
      timeTemp: 0,
    };
    this.timer = undefined;
  }

  handleStart = () => {
    if (this.timer !== undefined) return;
    this.createTimer();
  }

  handlePause = () => {
    this.timer = clearTimeout(this.timer);
  }

  handleStop = () => {
    this.timer = clearTimeout(this.timer);
    this.setState({
      timeString: '00:00:00',
      timeTemp: 0,
    });
  }

  createTimer() {
    this.timer = setTimeout(() => {
      this.setState((prevState) => {
        const newtime = prevState.timeTemp + 1;
        const ss = newtime % 60;
        const mm = (Math.floor(newtime / 60)) % 60;
        const hh = Math.floor(mm / 60);

        const showS = ss < 10 ? `0${ss}` : `${ss}`;
        const showM = mm < 10 ? `0${mm}` : `${mm}`;
        const showH = hh < 10 ? `0${hh}` : `${hh}`;

        return {
          timeString: `${showH}:${showM}:${showS}`,
          timeTemp: newtime,
        };
      }, this.createTimer);
    }, 1000);
  }

  render() {
    const {
      timeString,
    } = this.state;
    return (
      <div>
        <p>{timeString}</p>
        <button type="button" onClick={this.handleStart}>START</button>
        <br />
        <button type="button" onClick={this.handlePause}>PAUSE</button>
        <br />
        <button type="button" onClick={this.handleStop}>STOP</button>
      </div>
    );
  }
}

storiesOf('計時器', module)
  .add('Clock', () => (
    <div>
      <Clock />
    </div>
  ));
