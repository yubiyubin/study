//1. 모듈 불러오기
const readline = require("readline");

//2. 인터페이스(입출력 통로) 만들기
const rl = readline.createInterface({
  input: process.stdin, //input: 터미널에서 입력 받는 내용
  output: process.stdout, //output: 터미널에서 출력되는 내용
});

//첫줄: 총 카드 개수, M
//둘째 줄: 정수들

const lines = [];
rl.on("line", (line) => {
  lines.push(line);
  if (lines.length === 2) {
    rl.close();
  }
});

rl.on("close", () => {
  const [[N, M], nums] = lines.map((e) =>
    e.split(" ").map((e1) => parseInt(e1))
  );

  const sums = [];
  for (let i = 0; i < N - 2; i++) {
    for (let j = i + 1; j < N - 1; j++) {
      for (let k = j + 1; k < N; k++) {
        sums.push(nums[i] + nums[j] + nums[k]);
      }
    }
  }
  console.log(Math.max(...sums.filter((e) => e <= M)));
  return;
});
