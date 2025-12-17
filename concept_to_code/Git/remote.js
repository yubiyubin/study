class RemoteStorage {
  constructor() {
    this.repositories = {};
    this.currRepository = "";
  }
  //status remote repo명
  status(repositoryName) {
    //1. repo명 있는 경우: 해당 repo 내부 파일 목록 반환
    if (repositoryName) {
      return Object.keys(this.repositories[repositoryName]);
    }

    //2-2. currRepository 없는 경우: '해당 저장소 없음' 반환
    return "해당 저장소 없음";
  }
}

module.exports = RemoteStorage;
