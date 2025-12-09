//1. 모듈 불러오기
const readline = require("readline");

//2. 인터페이스(입출력 통로) 만들기
const rl = readline.createInterface({
  input: process.stdin, //input: 터미널에서 입력 받는 내용
  output: process.stdout, //output: 터미널에서 출력되는 내용
});

//정수의 개수
//정수
//찾으려는 수

let length, numsStr, targetNum;
const arr = [];
rl.on("line", (line) => {
  arr.push(line);

  if (arr.length === 3) {
    [length, numsStr, targetNum] = arr;
    rl.close();
    return;
  }
});

rl.on("close", () => {
  const nums = numsStr.split(" ");
  console.log(nums.filter((e) => e === targetNum).length);
  return;
});
