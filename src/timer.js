export class Timer {
  constructor(minutes, cb) {
    this.minutes = minutes || {};
    this.cb = cb || function(){};
  }

  start() {
    if(!!this._interval) return;
    this._interval = setInterval(() => {
      let now = new Date();
      let minute = now.getMinutes();
      if(this.minutes[minute]) {
        this.cb(this.minutes[minute]);
      }
    }, 1000)
  }

  stop() {
    clearInterval(this._interval);
    this._interval = null;
  }
}
