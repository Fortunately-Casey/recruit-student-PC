/* eslint-disable prettier/prettier */;

/**
 * 时间转换
 * @param {*} s
 */
export function Todate(chinadatetime) { //Fri Oct 31 18:00:00 UTC+0800 2008 
  if (chinadatetime) {
      var d = new Date(chinadatetime);
      var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);
      var date = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
      var datetime = d.getFullYear() + '-' + month + '-' + date;
      return datetime;
  } else {
      return "";
  }
}

/**
* 移动端键盘影响页面布局
* @param {*} s
*/
export function blur() {
  setTimeout(function () {
      window.scrollTo(0, document.body.scrollTop + 1);
      document.body.scrollTop >= 1 && window.scrollTo(0, document.body.scrollTop - 1);
  }, 10);
}

/**
* 环境配置
* @param {*} s
*/
export function getURL(url) {
  let _result = '';
  if (process.env.NODE_ENV === 'development') {
      _result = `/api${url}`; // 开发环境会自动走代理
  } else if (process.env.NODE_ENV === 'production') {
      _result = `https://yqfk.ntkfqjy.com:20000/api${url}`; // 正式环境地址
      // _result = `http://192.168.3.14:9090/api${url}`; // 正式环境地址
  }
  return _result;
}
/**
* 国际标准时
* @param {*} s
*/
export function chinaDateTime(chinadatetime) {
  // // 转为正常的时间格式 年-月-日 时:分:秒
  // var T_pos = utc_datetime.indexOf('T');
  // var Z_pos = utc_datetime.indexOf('Z');
  // var year_month_day = utc_datetime.substr(0,T_pos);
  // var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
  // var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06

  // // 处理成为时间戳
  // timestamp = new Date(Date.parse(new_datetime));
  // timestamp = timestamp.getTime();
  // timestamp = timestamp/1000;

  // // 增加8个小时，北京时间比utc时间多八个时区
  // var timestamp = timestamp+8*60*60;

  // // 时间戳转为时间
  // var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
  // return beijing_datetime; // 2017-03-31 16:02:06
  var d = new Date(chinadatetime);
  var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);
  var date = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
  var hour = d.getHours() >= 10 ? d.getHours() : "0" + d.getHours();
  var minutes = d.getMinutes() >= 10 ? d.getMinutes() : "0" + d.getMinutes();
  var datetime = d.getFullYear() + '-' + month + '-' + date + ' ' + hour + ':' + minutes;
  return datetime;
}
/**
* 时间转换
* @param {*} s
*/
export function Totime(time) {
  var d = new Date(time);
  var hour = d.getHours() >= 10 ? d.getHours() : "0" + d.getHours();
  var minutes = d.getMinutes() >= 10 ? d.getMinutes() : "0" + d.getMinutes();
  var datetime = hour + ':' + minutes;
  return datetime;
}


export function compare(property) {
  return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
  }
}
/**
* class方式创建地址对象
* @param {*} s
*/
export default class AddressName {
  constructor({
      id,
      name,
      short_name,
      key
  }) {
      this.id = id;
      this.name = name;
      this.short_name = short_name;
      this.key = key
  }
}

/**
* 防抖
* @param {*} s
*/
export function debounce(fn, delay) {
  let timer = null
  return function () {
      let arg = arguments

      clearTimeout(timer)

      timer = setTimeout(() => {
          fn.apply(this, arg)
      }, delay)
  }
}

/**
* 邮箱
* @param {*} s
*/
export function isEmail(s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
* 手机号码
* @param {*} s
*/
export function isMobile(s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
* 电话号码
* @param {*} s
*/
export function isPhone(s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
* URL地址
* @param {*} s
*/
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s)
}