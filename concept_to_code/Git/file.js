class File {
  constructor(fileName) {
    this.fileName = fileName;
    this.date = new Date().toLocaleString();
    this.state = STATES.UNTRACKED;
  }

  resetDate() {
    this.date = new Date().toLocaleString();
  }
}

module.exports = File;
