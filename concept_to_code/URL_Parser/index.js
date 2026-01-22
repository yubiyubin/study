//1. URL 문자열을 매겨변수로 전달
//2. 정상 형태인 경우 : URL 객체 생성
//      필수 항목 누락/ URL_CHARSET 미포함 항목 있는 경우: throw 처리

const { UrlService } = require("./core/URL_Service");

var url = new UrlService(
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
console.log(url.URL);
url.URL.appendPathComponent("basecamp");
url.URL.appendPathComponent("camp");
//url.URL.absoluteString = "http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2020/first/second/last/basecamp/camp?query=ab&param=12"
url.URL.deleteLastPathComponent();
//url.URL.absoluteString = "http://user_name: pass-word@boostcamp.connect-foundation.or.kr:2020/first/second/last/basecamp?query=ab&param=12"

var url2 = new UrlService(
  "http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2020/first/second/last?query=cd&param=12"
);
// shared
var zumurl = new UrlService("http://admin@zum.com/#!/home?query=zum");

var naverurl = new UrlService("http://m.naver.com");
console.log(zumurl.isEqual(naverurl.urlStr));

var url1 = new UrlService("http://admin@zum.com/#!/home?query=zum");
console.log(zumurl.isEqual(url1.urlStr));

var url2 = new UrlService("http://admin@zum.com/#!/home");
console.log(zumurl.isEqual(url2.urlStr));

var url3 = new UrlService("http://admin@zum.com/?param=zum");
console.log(zumurl.isEqual(url3.urlStr));

var url4 = new UrlService("http://zum.com/#!/home");
console.log(zumurl.isEqual(url4.urlStr));
