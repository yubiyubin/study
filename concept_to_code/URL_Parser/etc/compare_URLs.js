const { UrlParser } = require("../core/URL_parser");

const areURLsEqual = (url1, url2) => {
  const baseURL = new UrlParser(url1).parsedURL;
  const otherURL = new UrlParser(url2).parsedURL;
  //scheme 동일
  if (baseURL.scheme === otherURL.scheme) {
    //scheme,  host:port 동일
    if (baseURL.host === otherURL.host && baseURL.port === otherURL.port) {
      //scheme부터 username, password, host:port 동일
      if (
        baseURL.user === otherURL.user &&
        baseURL.password === otherURL.password
      ) {
        //scheme부터 username, password, host:port, path 동일
        if (baseURL.pathComponents === otherURL.pathComponents) {
          //전체동일
          if (baseURL.absoluteStr === otherURL.absoluteStr) {
            return `완전히 동일한 URL입니다.`;
          }
          return `scheme, host:port, path가 동일한 URL입니다.`;
        }
        return "scheme, host:port, userInfo가 동일한 URL입니다.";
      }
      return "scheme, host:port가 동일한 URL입니다.";
    }
    return "scheme만 동일한 URL입니다.";
  }
  //다른 URL
  return "서로 다른 URL입니다.";
};

module.exports = { areURLsEqual };
