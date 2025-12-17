const Repository = require("./repository");

class LocalStorage {
  constructor() {
    this.repositories = {};
    this.currRepository = "";
  }
  //init repo명 : 해당 이름의 repo를 local 저장소에 생성
  init(repositoryName) {
    if (this.repositories[repositoryName]) {
      // TODO: 디테일한거 챙기기
      console.log("동일한 이름의 레포지토리가 이미 존재합니다.");
      return;
    }
    this.repositories[repositoryName] = new Repository();
  }

  //status repo명
  status(repositoryName) {
    //1. repo명 입력한 경우: 해당 repo 내부의 파일 상태 반환
    if (repositoryName) {
      return this.repositories[repositoryName];
    }
    //2. repo명 입력 안한 경우
    //2-1.checkout해서 currRepo 있는 경우: currRepo 내부의 파일 상태 반환
    if (this.currRepository) {
      return this.repositories[this.currRepository];
    }
    // 2-2.checkout도 안한 경우: 전체 repo 목록 출력
    return Object.keys(this.repositories);
  }

  //checkout repo명
  checkout(repositoryName) {
    //1. repo명을 입력한 경우: 해당 repo를 currRepo로 설정하고, 프롬프트 문구를 ‘/repo명/>’으로 반환
    if (repositoryName) {
      this.currRepository = repositoryName;
    }
    //2. repo명을 입력하지 않은 경우: 원래의 프롬프트 문구 반환
    return `/${this.currRepository}/>`;
  }
}

module.exports = LocalStorage;
