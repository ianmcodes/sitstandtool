(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _timer = require("./timer");

window.sitstand = {};

sitstand._tag = "sitstand_" + Math.random();

sitstand._standMsg = "STAND";
sitstand._sitMsg = "SIT";

sitstand.start = function () {
  // if no timer
  if (!sitstand.timer) {
    // get values
    var standFor = parseInt(document.getElementById('standFor').value) || 15;
    var when = document.getElementById('when').value || 'start';
    var minutes = {},
        standAt = void 0;
    // calculate minutes
    switch (when) {
      case 'start':
        standAt = 0;
        break;
      case 'middle':
        standAt = 30 - Math.floor(standFor / 2);
        break;
      case 'end':
        standAt = 59 - standFor;
        break;
    }
    minutes[standAt] = sitstand._standMsg;
    minutes[standAt + standFor] = sitstand._sitMsg;
    // init timer
    sitstand.timer = new _timer.Timer(minutes, sitstand.callback);
  }
  // start timer
  sitstand.timer.start();
  sitstand.setState(sitstand._sitMsg);
};

sitstand.pause = function () {
  // stop timer, do not destroy
  if (!sitstand.timer) return;
  sitstand.timer.stop();
};

sitstand.stop = function () {
  // stop and destroy timer
  if (!sitstand.timer) return;
  sitstand.timer.stop();
  sitstand.timer = null;
  sitstand.setState("");
};

sitstand.enableNotifications = function () {
  var notificationChkBx = document.getElementById('notificationsEnabled');
  if (Notification.permission !== 'granted' && notificationChkBx.checked) {
    Notification.requestPermission().then(function (response) {
      if (response === 'granted') {
        new Notification("Thank you for enabling notifications!", {});
        sitstand.notifications_on = true;
        notificationChkBx.checked = true;
      } else {
        notificationChkBx.checked = false;
      }
    });
  } else if (!notificationChkBx.checked) {
    sitstand.notifications_on = false;
  } else {
    sitstand.notifications_on = true;
  }
};

sitstand.callback = function (response) {
  // notify user
  if (sitstand.notifications_on) {
    sitstand.note = new Notification(response, {
      "tag": sitstand._tag,
      renotify: true
    });
  }
  sitstand.setState(response);
};

sitstand.setState = function (state) {
  var stateEl = document.getElementById("state");
  stateEl.innerHTML = state;
};
},{"./timer":2}],2:[function(require,module,exports){
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
},{}]},{},[1]);
