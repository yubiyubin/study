//1. 모듈 불러오기
const readline = require("readline");

//2. 인터페이스(입출력 통로) 만들기
const rl = readline.createInterface({
  input: process.stdin, //input: 터미널에서 입력 받는 내용
  output: process.stdout, //output: 터미널에서 출력되는 내용
});

let nums = [];
rl.on("line", (line) => {
  nums.push(line);
  if (nums.length === 9) {
    rl.close();
    return;
  }
});

rl.on("close", () => {
  nums = nums.map((e) => parseInt(e));
  console.log(Math.max(...nums));
  console.log(nums.indexOf(Math.max(...nums)) + 1);
  return;
});
