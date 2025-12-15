//1. 모듈 불러오기
const readline = require("readline");

//2. 인터페이스(입출력 통로) 만들기
const rl = readline.createInterface({
  input: process.stdin, //input: 터미널에서 입력 받는 내용
  output: process.stdout, //output: 터미널에서 출력되는 내용
});
//직사각형: 가로 w, 세로 h
//현재 위치: (x,y)

let x, y, w, h;
rl.on("line", (line) => {
  [x, y, w, z] = line.split(" ");
  rl.close();
});

rl.on("close", () => {
  const distances = [x, y, w - x, z - y];
  console.log(Math.min(...distances));
  return;
});
