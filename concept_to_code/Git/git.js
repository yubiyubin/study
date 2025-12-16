// const.js
const STATE = {
  UNTRACKED: "untracked",
  STAGED: "staged",
  UNMODIFIED: "unmodified",
  MODIFIED: "modified",
};

const COMMANDS = {};

class File {
  constructor(fileName) {
    this.fileName = fileName;
    this.date = new Date().toLocaleString();
    this.state = STATE.UNTRACKED;
  }

  resetDate() {
    this.date = new Date().toLocaleString();
  }
}

class Commit {
  constructor(commitMsg) {
    this.commitMsg = commitMsg;
    this.snapshot = {};
  }

  updateSnapshot(snapshot) {
    this.snapshot = snapshot;
  }
}

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
    this.stagingArea[fileName].state = STATE.STAGED;
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
      this.stagingArea[file].state = STATE.UNMODIFIED;
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
const git = new Git();

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let outputMessage;
rl.on("line", (line) => {
  const currCommand = line.split(" ");
  switch (currCommand[0]) {
    case "init": {
      const repositoryName = currCommand[1];
      git.local.init(repositoryName);
      outputMessage = `created ${repositoryName} repository.`;
      break;
    }
    case "status": {
      //1. status repo명인 경우
      if (currCommand[1] !== "remote") {
        const repositoryName = currCommand[1];
        outputMessage = git.local.status(repositoryName);
      }
      //2. status remote repo명인 경우
      else {
        const repositoryName = currCommand[2];
        outputMessage = git.remote.status(
          repositoryName ?? git.local.currRepository
        );
      }
      break;
    }
    case "checkout": {
      const repositoryName = currCommand[1];
      rl.setPrompt(`${git.local.checkout(repositoryName)}`);
      outputMessage = `checked out to ${repositoryName}`;
      break;
    }
    case "new": {
      const fileName = currCommand[1];
      const currRepository = git.local.currRepository;
      git.local.repositories[currRepository].new(fileName);
      outputMessage = `${fileName} created in ${currRepository}`;
      break;
    }
    case "update": {
      const fileName = currCommand[1];
      const currRepository = git.local.currRepository;
      git.local.repositories[currRepository].update(fileName);
      outputMessage = `${fileName} create time updated`;
      break;
    }
    case "add": {
      const fileName = currCommand[1];
      const currRepository = git.local.currRepository;
      git.local.repositories[currRepository].add(fileName);
      outputMessage = `${fileName} staged`;
      break;
    }
    case "commit": {
      const commitMSG = currCommand[1];
      const currRepository = git.local.currRepository;
      git.local.repositories[currRepository].commit(commitMSG);
      outputMessage = `${commitMSG} commit successed`;
      break;
    }
    case "log": {
      const currRepository = git.local.currRepository;
      outputMessage = git.local.repositories[currRepository].log();
      break;
    }
    case "push": {
      git.push();
      outputMessage = "pushed to remote";
    }
  }
  console.dir(outputMessage, { depth: null });
  rl.prompt();
});
