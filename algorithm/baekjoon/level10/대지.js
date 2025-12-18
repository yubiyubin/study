//1. 모듈 불러오기
const readline = require("readline");

//2. 인터페이스(입출력 통로) 만들기
const rl = readline.createInterface({
  input: process.stdin, //input: 터미널에서 입력 받는 내용
  output: process.stdout, //output: 터미널에서 출력되는 내용
});

//넓이= (maxX-minX)*(maxY-minY)

const coors = [];
let range;
rl.on("line", (line) => {
  coors.push(line.split(" "));
  range = Number(coors[0][0]);
  if (coors.length === range + 1) {
    rl.close();
  }
});

rl.on("close", () => {
  coors.shift();

  const xCoors = [];
  const yCoors = [];

  coors.forEach((e) => {
    xCoors.push(e[0]);
    yCoors.push(e[1]);
  });

  const maxX = Math.max(...xCoors);
  const maxY = Math.max(...yCoors);
  const minX = Math.min(...xCoors);
  const minY = Math.min(...yCoors);
  const area = (maxX - minX) * (maxY - minY);
  console.log(area);
  return;
});
