//1. 모듈 불러오기
const readline = require("readline");

//2. 인터페이스(입출력 통로) 만들기
const rl = readline.createInterface({
  input: process.stdin, //input: 터미널에서 입력 받는 내용
  output: process.stdout, //output: 터미널에서 출력되는 내용
});

const nums = [];
rl.on("line", (line) => {
  if (line === "0 0") {
    rl.close();
    return;
  }
  nums.push(line.split(" ").map((e) => parseInt(e)));
});

rl.on("close", () => {
  for (let i = 0; i < nums.length; i++) {
    console.log(`${nums[i][0] + nums[i][1]}`);
  }
});
