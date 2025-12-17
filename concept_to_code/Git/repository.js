const File = require("./file");
const Commit = require("./commit");

class Repository {
  constructor() {
    this.workingDirectory = {};
    this.stagingArea = {};
    this.gitRepository = {};
  }
  //new 파일명: working directory에 해당 파일 생성(생성시간,이름,상태:untracked) 포함
  new(fileName) {
    this.workingDirectory[fileName] = new File(fileName);
  }

  //update 파일명: working directory 내의 해당 파일의 생성시간을 현재로 변경
  update(fileName) {
    this.workingDirectory[fileName].resetDate();
  }

  //add 파일명: 해당 파일을 stagingArea로 이동, 상태:Staged 로 변경
  add(fileName) {
    this.stagingArea[fileName] = structuredClone(
      this.workingDirectory[fileName]
    );
    this.stagingArea[fileName].state = STATES.STAGED;
    delete this.workingDirectory[fileName];
  }

  //commit 커밋메세지
  commit(commitMsg) {
    //gitRepo에 커밋 메세지를 key로 하는 commit 생성
    const currCommit = new Commit(commitMsg);
    this.gitRepository[commitMsg] = currCommit;

    //모든 파일에 대해 date: 커밋 시간 현재로, 상태: unmodified로 변경
    Object.keys(this.stagingArea).forEach((file) => {
      this.stagingArea[file].date = new Date().toLocaleString();
      this.stagingArea[file].state = STATES.UNMODIFIED;
    });
    //stage에 있는 모든 파일을 gitRepo의 해당 commit의 스냅샷으로 이동
    currCommit.updateSnapshot(structuredClone(this.stagingArea));
    this.stagingArea = {};
  }

  //log: 해당 repo 의 커밋한 파일 목록 출력
  // TODO: values or entries도 써보기!
  log() {
    const commitMsgs = Object.keys(this.gitRepository);
    return commitMsgs.map((commitMsg) => {
      const currCommit = this.gitRepository[commitMsg];
      return [currCommit.commitMsg, currCommit.snapshot];
    });
  }
}
module.exports = Repository;
