import Vue from 'vue';
import {
  log
} from 'util';
Vue.filter('countdown', (time) => {
  let oDate2 = new Date(time); // 初始时间
  let oDate1 = new Date(); // 现在时间
  let hour = 0;
  let minute = 0;
  let seconds = 0;
  if (oDate2 > oDate1) {
    let nTime = (oDate2.getTime() - oDate1.getTime()) / 1000;
    hour = Math.floor(nTime / 3600);
    hour < 10 ? (hour = '0' + hour) : hour;
    minute = Math.floor((nTime % 3600) / 60);
    minute < 10 ? (minute = '0' + minute) : minute;
    seconds = Math.floor(nTime - hour * 3600 - minute * 60);
    seconds < 10 ? (seconds = '0' + seconds) : seconds;
    // 剩下的时分秒，
  }
  return hour + ':' + minute + ':' + seconds;
});
/**
 * @value new Date
 * @item 1为2018-10-11 19:19:19   
 * 0为2018-10-11
 */
Vue.filter('timeFormatter', (time, cFormat) => {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time)
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
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
});
export const filter = filter;
