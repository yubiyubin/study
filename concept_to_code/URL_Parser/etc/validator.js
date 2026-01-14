const { URL_CHARSET_REGEX, URL_PARSING_REGEXS } = require("./const");

//URL_CHARSET_REGEX에 미포함된 문자가 들어가있는 경우 또는 host 또는 scheme이 없는 경우 : return false
const getUrlValidation = (urlStr) => {
  if (
    urlStr.length !== urlStr.match(URL_CHARSET_REGEX, "g").length ||
    (!urlStr.match(URL_PARSING_REGEXS.HOST) &&
      !urlStr.match(URL_PARSING_REGEXS.USER)) ||
    !urlStr.match(URL_PARSING_REGEXS.SCHEME)
  ) {
    return false;
  }
  return true;
};

module.exports = { getUrlValidation };

//a = "http://m.naver.com";
//var url4 = new URL_Parser("http://zum.com/#!/home");
// b = "http://admin@zum.com/#!/home?query=zum";
// console.log(getUrlValidation(b));
// console.log(getUrlValidation(url));
// const url =
//   "http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2020/first/second/last?query=ab&param=12";
