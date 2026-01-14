const { URL_CHARSET_REGEX, URL_PARSING_REGEXS } = require("../etc/const");
const { ParsedURL } = require("../model/parsedURL");

class UrlParser {
  constructor(urlStr) {
    this.urlStr = urlStr;
    this.parsedURL = new ParsedURL();
    this.parseURL();
    this.parsedURL.printInfo();
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
    this.parsedURL.absoluteStr = this.urlStr;
  }

  #setScheme() {
    this.parsedURL.scheme = this.urlStr.match(URL_PARSING_REGEXS.SCHEME)[1];
  }

  #setUserInfo() {
    const user = this.urlStr.match(URL_PARSING_REGEXS.USER);
    const password = this.urlStr.match(URL_PARSING_REGEXS.PASSWORD);
    //유저가 있는 경우
    if (user) {
      this.parsedURL.user = user[1];
      if (password) {
        this.parsedURL.password = password[1];
      }
      return;
    }
    //유저가 없고 패스워드만 있는 경우
    if (password) {
      this.parsedURL.user = password[1].replaceAll("/", "");
    }
  }

  #setHost() {
    const host = this.urlStr.match(URL_PARSING_REGEXS.HOST);
    if (host) {
      this.parsedURL.host = host[1];
      return;
    }
    this.parsedURL.host = this.parsedURL.user;
    this.parsedURL.user = "";
  }

  #setPort() {
    const port = this.urlStr.match(URL_PARSING_REGEXS.PORT);
    if (port) {
      this.parsedURL.port = port[1];
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
      this.parsedURL.setPathComponents(pathComponenets[1]);
      return;
    }
    this.parsedURL.setPathComponents();
  }

  #setQuery() {
    const query = this.urlStr.match(URL_PARSING_REGEXS.QUERY);
    if (query) {
      this.parsedURL.query = query[1];
    }
  }
}

module.exports = { UrlParser };
