class Commit {
  constructor(commitMsg) {
    this.commitMsg = commitMsg;
    this.snapshot = {};
  }

  updateSnapshot(snapshot) {
    this.snapshot = snapshot;
  }
}
module.exports = Commit;
