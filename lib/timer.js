"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Timer = exports.Timer = function () {
  function Timer(minutes, cb) {
    babelHelpers.classCallCheck(this, Timer);

    this.minutes = minutes || {};
    this.cb = cb || function () {};
  }

  babelHelpers.createClass(Timer, [{
    key: "start",
    value: function start() {
      var _this = this;

      if (!!this._interval) return;
      this._interval = setInterval(function () {
        var now = new Date();
        var minute = now.getMinutes();
        if (_this._lastMinute === minute) return;
        _this._lastMinute = minute;
        if (_this.minutes[minute]) {
          _this.cb(_this.minutes[minute]);
        }
      }, 30000);
    }
  }, {
    key: "stop",
    value: function stop() {
      clearInterval(this._interval);
      this._interval = null;
    }
  }]);
  return Timer;
}();