//박스 :n개
//가로 :w
//꺼낼 박스 번호 :num

/**
 *
 * @param {number} n
 * @param {number} w
 * @param {number} num
 * @returns number
 */
const solution = (n, w, num) => {
  //상자 쌓은 배열 만들기
  let boxesArr = [];
  for (let i = 0; i < Math.ceil(n / w); i++) {
    boxesArr[i] ??= [];
    for (let j = i * w + 1; j <= (i + 1) * w; j++) {
      boxesArr[i].push(j);
      if (j === n) {
        break;
      }
    }
  }
  boxesArr = boxesArr.map((e, i) => {
    if (i % 2 === 1) {
      e = e.reverse();
    }
    return e;
  });
  while (boxesArr.at(-1).length < w) {
    if (boxesArr.length % 2 === 0) {
      boxesArr.at(-1).unshift(0);
    } else {
      boxesArr.at(-1).push(0);
    }
  }

  //num의 index 찾기
  //행
  const row = Math.floor((num - 1) / w);
  const column = boxesArr[row].indexOf(num);

  let ans = boxesArr.length - row;
  if (boxesArr.at(-1)[column] === 0) {
    ans -= 1;
  }
  console.log(boxesArr);
  return ans;
};

//console.log(solution(22, 6, 8));
console.log(solution(13, 3, 6));
