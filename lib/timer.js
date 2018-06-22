"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = exports.Timer = function () {
  function Timer(minutes, cb) {
    _classCallCheck(this, Timer);

    this.minutes = minutes || {};
    this.cb = cb || function () {};
  }

  _createClass(Timer, [{
    key: "start",
    value: function start() {
      var _this = this;

      if (!!this._interval) return;
      this._interval = setInterval(function () {
        var now = new Date();
        var minute = now.getMinutes();
        if (_this.minutes[minute]) {
          _this.cb(_this.minutes[minute]);
        }
      }, 1000);
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