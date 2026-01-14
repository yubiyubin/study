const { URL_CHARSET_REGEX, URL_PARSING_REGEXS } = require("./const");
const { URL } = require("./URL");
const { getUrlValidation } = require("./validators");

class UrlParser {
  constructor(urlStr) {
    this.urlStr = urlStr;
    this.validateURL();
    this.URL = new URL();
    this.parseURL();
    this.URL.printInfo();
  }

  //입력 받은 URL 유효성 검사
  validateURL() {
    if (!getUrlValidation(this.urlStr)) {
      throw new Error("URL형식에 맞지 않는 입력입니다.");
    }
  }
  parseURL() {
    this.#setScheme();
    this.#setUserInfo();
    this.#setHost();
    this.#setPort();
    this.#setQuery();
    this.#setPathComponents();
    this.#setAblsoluteStr();
  }

  #setAblsoluteStr() {
    this.URL.absoluteStr = this.urlStr;
  }
  #setScheme() {
    this.URL.scheme = this.urlStr.match(URL_PARSING_REGEXS.SCHEME)[1];
  }

  #setUserInfo() {
    const user = this.urlStr.match(URL_PARSING_REGEXS.USER);
    const password = this.urlStr.match(URL_PARSING_REGEXS.PASSWORD);
    //유저가 있는 경우
    if (user) {
      this.URL.user = user[1];
      if (password) {
        this.URL.password = password[1];
      }
      return;
    }
    //유저가 없고 패스워드만 있는 경우
    if (password) {
      this.URL.user = password[1].replaceAll("/", "");
    }
  }

  #setHost() {
    const host = this.urlStr.match(URL_PARSING_REGEXS.HOST);
    if (host) {
      this.URL.host = host[1];
      return;
    }
    this.URL.host = this.URL.user;
    this.URL.user = "";
  }

  #setPort() {
    const port = this.urlStr.match(URL_PARSING_REGEXS.PORT);
    if (port) {
      this.URL.port = port[1];
    }
  }

  #setPathComponents() {
    let pathComponenets = this.urlStr.match(URL_PARSING_REGEXS.PATHCOMPONENTS);
    if (!pathComponenets) {
      pathComponenets = this.urlStr.match(
        URL_PARSING_REGEXS.PATHCOMPONENTS_AFTER_HASH
      );
    }
    if (pathComponenets) {
      this.URL.setPathComponents(pathComponenets[1]);
      return;
    }
    this.URL.setPathComponents();
  }

  #setQuery() {
    const query = this.urlStr.match(URL_PARSING_REGEXS.QUERY);
    if (query) {
      this.URL.query = query[1];
    }
  }
}

module.exports = { URL_Parser };
