const Git = require("./git");

const promptUser = () => {
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
};

module.exports = promptUser;
