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

/*TODO 
1. 각 modules의 naming과 role 명확하게!
  - UrlService가 controller 역할을 하고있고 UrlParser가 service역할을 하고있음
  - naming은 class의 경우 PascalCase, 변수는 camelCase, 상수는 모두 대문자로!

2. index.js에 코드 실행을 위한 테스트 X
  - jest를 사용한 단위 테스트로 수정

3. module 분리와 응집에 따른 복잡성 고민
  - 어느정도로 분리 or 어느정도로 응집 시켜야 적절할지 고민

4. class의 프로퍼티는 model역할을 하는 class에게 일임
  - controller와 model역할을 동시에 한다면 해당 class가 프로퍼티를 가지고 있어도 무방

*/
