const LocalStorage = require("./local");
const RemoteStorage = require("./remote");
class Git {
  constructor() {
    this.local = new LocalStorage();
    this.remote = new RemoteStorage();
  }

  //push: remote 저장소에 local의 해당 저장소 복제(local의 커밋 이력, git repository의 파일 모두 복사)
  push() {
    const currRepository = this.local.currRepository;
    this.remote.repositories[currRepository] = structuredClone(
      this.local.repositories[currRepository].gitRepository
    );
  }
}
module.exports = Git;
