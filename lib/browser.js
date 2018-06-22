"use strict";

var _timer = require("./timer");

var sitstand = {};

sitstand._tag = "sitstand_" + Math.random();

sitstand._standMsg = "STAND";
sitstand._sitMsg = "SIT";

sitstand.start = function () {
  // if no timer
  if (!sitstand.timer) {
    // get values
    var standFor = document.getElementById('standFor').value || 15;
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
        standAt = 60 - standFor;
        break;
    }
    minutes[standAt] = sitstand._standMsg;
    minutes[standAt + standFor] = sitstand._sitMsg;
    // init timer
    sitstand.timer = new _timer.Timer(minutes, sitstand.callback);
  }
  // start timer
  sitstand.timer.start();
};

sitstand.pause = function () {
  // stop timer, do not destroy
  sitstand.timer.stop();
};

sitstand.stop = function () {
  // stop and destroy timer
  sitstand.timer.stop();
  sitstand.timer = null;
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
  }
};

sitstand.callback = function (response) {
  // notify user
  if (sitstand.notifications_on) {
    new Notification(response, {
      "tag": sitstand._tag,
      renotify: true
    });
  }
  var stateEl = document.getElementById("state");
  stateEl.innerHTML = response;
};