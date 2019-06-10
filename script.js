class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
      running: false,
      intervals: []
    };
  }

  start() {
    if (!this.state.running) {
      this.setState({ running: true });
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  stop() {
    this.setState({ running: false });
    clearInterval(this.watch);
  }

  step() {
    if (!this.state.running) return;
    this.calculate();
  }

  reset() {
    this.setState({
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
      running: false
    });
  }

  calculate() {
    this.setState({ miliseconds: (this.state.miliseconds += 1) });
    if (this.state.miliseconds >= 100) {
      this.setState({ seconds: (this.state.seconds += 1) });
      this.setState({ miliseconds: (this.state.miliseconds = 0) });
    }
    if (this.state.seconds >= 60) {
      this.setState({ minutes: (this.state.minutes += 1) });
      this.setState({ seconds: (this.state.seconds = 0) });
    }
  }

  addTime() {
    this.setState({
      intervals: this.state.intervals.concat([
        `: ${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(
          Math.floor(this.state.miliseconds)
        )}`
      ])
    });
  }

  clearTimeList() {
    this.setState({
      intervals: []
    });
  }

  render() {
    return (
      <div className="timer">
        <div className="controls">
          <button className="button" id="start" onClick={this.start.bind(this)}>
            Start
          </button>
          <button className="button" id="stop" onClick={this.stop.bind(this)}>
            Stop
          </button>
          <button className="button" id="reset" onClick={this.reset.bind(this)}>
            Restart
          </button>
        </div>
        <div className="stopwatch">
          <div>
            {pad0(this.state.minutes)}:{pad0(this.state.seconds)}:
            {pad0(Math.floor(this.state.miliseconds))}
          </div>
        </div>
        <div className="controls">
          <button className="button" id="add" onClick={this.addTime.bind(this)}>
            Add intervals
          </button>
          <button
            className="button"
            id="clear"
            onClick={this.clearTimeList.bind(this)}
          >
            Clear intervals
          </button>
        </div>
        <ul className="results">
          {this.state.intervals.map((interval, i) => (
            <li key={i}>
              {i + 1} Interval {interval}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}

let stopwatch = React.createElement(Stopwatch);
ReactDOM.render(stopwatch, document.getElementById("stopwatch"));
