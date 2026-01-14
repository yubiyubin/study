//1. URL 문자열을 매겨변수로 전달
//2. 정상 형태인 경우 : URL 객체 생성
//      필수 항목 누락/ URL_CHARSET 미포함 항목 있는 경우: throw 처리

const { UrlParser } = require("./URL_parser");

// const url =
//   "http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2020/first/second/last?query=ab&param=12";
// b = "http://admin@zum.com/#!/home?query=zum";
// a = new URL_Parser(url);
// a.URL.appendPathComponent("aaaaa");
// // a.URL.appendPathComponent("ddd");
// // a.URL.deleteLastPathComponent();
// a.URL.pathComponents = "sdad";
// console.log(a.URL.pathComponents);

// // a.URL.printInfo();
// // b = new URL_Parser(
// //   "http://user_name:pass-wordboostcamp.connect-foundation.or.kr:2020/first/second/last?query=ab&param=12"
// // );
// //console.log(a);
// //url.host = "boostcamp.connect-foundation.or.kr"
// //url.lastPathComponent = "last"
// //url.pathComponents = ["/", "first", "second", "last"]
// //url.port = 2020
// //url.query = "query=ab&param=12"
// //url.scheme = "http"
// //url.isFileURL = false
// //url.user = "user_name"
// //url.password = "pass-word"
// //url.absoluteString = "http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2019/first/second/last?query=ab&param=12"
var url = new UrlParser(
  "http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2020/first/second/last?query=ab&param=12"
);

//url.host = "boostcamp.connect-foundation.or.kr"
//url.lastPathComponent = "last"
//url.pathComponents = ["/", "first", "second", "last"]
//url.port = 2020
//url.query = "query=ab&param=12"
//url.scheme = "http"
//url.isFileURL = false
//url.user = "user_name"
//url.password = "pass-word"
//url.absoluteString = "http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2020/first/second/last?query=ab&param=12"

url.URL.appendPathComponent("basecamp");
url.URL.appendPathComponent("camp");
//url.absoluteString = "http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2020/first/second/last/basecamp/camp?query=ab&param=12"
url.URL.deleteLastPathComponent();
//url.absoluteString = "http://user_name: pass-word@boostcamp.connect-foundation.or.kr:2020/first/second/last/basecamp?query=ab&param=12"

var url2 = new UrlParser(
  "http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2020/first/second/last?query=cd&param=12"
);

var zumurl = new UrlParser("http://admin@zum.com/#!/home?query=zum");

var naverurl = new UrlParser("http://m.naver.com");
console.log(zumurl.URL.isEqual(naverurl));

var url1 = new UrlParser("http://admin@zum.com/#!/home?query=zum");
console.log(zumurl.URL.isEqual(url1));

var url2 = new UrlParser("http://admin@zum.com/#!/home");
console.log(zumurl.URL.isEqual(url2));

var url3 = new UrlParser("http://admin@zum.com/?param=zum");
console.log(zumurl.URL.isEqual(url3));

var url4 = new UrlParser("http://zum.com/#!/home");
console.log(zumurl.URL.isEqual(url4));
