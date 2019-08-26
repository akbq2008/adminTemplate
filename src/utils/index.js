/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    );
  }
}
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
// 防抖
export function _debounce(fn, delayTime) {
  var delay = delayTime || 200;
  var timer;
  return function() {
    var th = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      timer = null;
      fn.apply(th, args);
    }, delay);
  };
}
export function _throttle(fn, interval) {
  var last;
  var timer;
  interval = interval || 200;
  return function() {
    var th = this;
    var args = arguments;
    var now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        last = now;
        fn.apply(th, args);
      }, interval);
    } else {
      last = now;
      fn.apply(th, args);
    }
  };
}

export function remainTime(time, cFormat) {
  if (!time || time < 0) return;
  let day = '';
  let h = '';
  let m = '';
  let s = '';
  time > 86400 ? day = (time / 86400) : '';
  const format = cFormat || '{d} {h}:{m}:{s}';
  day > 0 ? h = (time - 86400) / 3600 : h = time / 3600;
  m = time / 60 % 60;
  s = time % 60;
  const formatObj = {
    d: day,
    h: h,
    m: m,
    s: s
  };
  const time_str = format.replace(/{(d|h|m|s)+}/g, (result, key) => {
    let value = Math.floor(formatObj[key]);
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;

}

export function getDaterange(dayCount, oneDay) {
  const start = new Date();
  const end = new Date();
  if (oneDay) {
    start.setTime(start.getTime() - 3600 * 1000 * 24 * dayCount);
    end.setTime(end.getTime() - 3600 * 1000 * 24 * dayCount);
    start.setTime(new Date(start.toLocaleDateString()).getTime());
    end.setTime(new Date(end.toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
  } else {
    start.setTime(start.getTime() - 3600 * 1000 * 24 * dayCount);
    start.setTime(new Date(start.toLocaleDateString()).getTime());
    end.setTime(new Date(end.toLocaleDateString()).getTime() - 1);
  }
  return [parseTime(start), parseTime(end)];
}

