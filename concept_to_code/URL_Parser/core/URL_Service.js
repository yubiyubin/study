const { UrlParser } = require("./URL_parser");
const { areURLsEqual } = require("../etc/compare_URLs");
const { getUrlValidation } = require("../etc/validator");

class UrlService {
  constructor(urlStr) {
    this.URL = undefined;
    this.urlStr = urlStr;
    this.validateURL();
    this.parseURL();
  }

  //입력 받은 URL 유효성 검사
  validateURL() {
    if (!getUrlValidation(this.urlStr)) {
      throw new Error("URL형식에 맞지 않는 입력입니다.");
    }
  }

  parseURL() {
    const urlParser = new UrlParser(this.urlStr);
    this.URL = urlParser.parsedURL;
  }

  isEqual(otherUrlStr) {
    return areURLsEqual(this.urlStr, otherUrlStr);
  }
}
module.exports = { UrlService };
