"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch(props) {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

    _this.state = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
      running: false,
      intervals: []
    };
    return _this;
  }

  _createClass(Stopwatch, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      if (!this.state.running) {
        this.setState({ running: true });
        this.watch = setInterval(function () {
          return _this2.step();
        }, 10);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this.setState({ running: false });
      clearInterval(this.watch);
    }
  }, {
    key: "step",
    value: function step() {
      if (!this.state.running) return;
      this.calculate();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.setState({
        minutes: 0,
        seconds: 0,
        miliseconds: 0,
        running: false
      });
    }
  }, {
    key: "calculate",
    value: function calculate() {
      this.setState({ miliseconds: this.state.miliseconds += 1 });
      if (this.state.miliseconds >= 100) {
        this.setState({ seconds: this.state.seconds += 1 });
        this.setState({ miliseconds: this.state.miliseconds = 0 });
      }
      if (this.state.seconds >= 60) {
        this.setState({ minutes: this.state.minutes += 1 });
        this.setState({ seconds: this.state.seconds = 0 });
      }
    }
  }, {
    key: "addTime",
    value: function addTime() {
      this.setState({
        intervals: this.state.intervals.concat([": " + pad0(this.state.minutes) + ":" + pad0(this.state.seconds) + ":" + pad0(Math.floor(this.state.miliseconds))])
      });
    }
  }, {
    key: "clearTimeList",
    value: function clearTimeList() {
      this.setState({
        intervals: []
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "timer" },
        React.createElement(
          "div",
          { className: "controls" },
          React.createElement(
            "button",
            { className: "button", id: "start", onClick: this.start.bind(this) },
            "Start"
          ),
          React.createElement(
            "button",
            { className: "button", id: "stop", onClick: this.stop.bind(this) },
            "Stop"
          ),
          React.createElement(
            "button",
            { className: "button", id: "reset", onClick: this.reset.bind(this) },
            "Restart"
          )
        ),
        React.createElement(
          "div",
          { className: "stopwatch" },
          React.createElement(
            "div",
            null,
            pad0(this.state.minutes),
            ":",
            pad0(this.state.seconds),
            ":",
            pad0(Math.floor(this.state.miliseconds))
          )
        ),
        React.createElement(
          "div",
          { className: "controls" },
          React.createElement(
            "button",
            { className: "button", id: "add", onClick: this.addTime.bind(this) },
            "Add intervals"
          ),
          React.createElement(
            "button",
            {
              className: "button",
              id: "clear",
              onClick: this.clearTimeList.bind(this)
            },
            "Clear intervals"
          )
        ),
        React.createElement(
          "ul",
          { className: "results" },
          this.state.intervals.map(function (interval, i) {
            return React.createElement(
              "li",
              null,
              i + 1,
              " Interval ",
              interval
            );
          })
        )
      );
    }
  }]);

  return Stopwatch;
}(React.Component);

function pad0(value) {
  var result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}

var stopwatch = React.createElement(Stopwatch);
ReactDOM.render(stopwatch, document.getElementById("stopwatch"));
