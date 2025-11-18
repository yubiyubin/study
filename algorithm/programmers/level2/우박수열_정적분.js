//n= k가 1이 되기까지의 횟수
//[a,b]일 때 적분 구간: a~ n+b
//n+b<a 인 경우: -1 return

// hoisting

// 객체 지향
const solution = (k, ranges) => {
  //k 수열 구하기
  const kArr = [k];

  while (k !== 1) {
    if (k % 2 === 0) {
      k = k / 2;
    } else {
      k = k * 3 + 1;
    }
    kArr.push(k);
  }

  const n = kArr.length - 1;

  return ranges.map(([start, end]) => integration(start, end + n));

  /**
   * @param {number} startRange
   * @param {number} endRange
   * @returns number
   */
  function integration(startRange, endRange) {
    if (endRange < startRange) {
      return -1;
    }

    let integratedArea = 0;
    //한칸: (k값+다음k값)/2
    for (let i = startRange; i < endRange; i++) {
      integratedArea += (kArr[i] + kArr[i + 1]) / 2;
    }
    return integratedArea;
  }
};

console.log(
  solution(5, [
    [0, 0],
    [0, -1],
    [2, -3],
    [3, -3],
  ])
);
