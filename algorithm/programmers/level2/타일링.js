//n: 가로 길이
//return: 1,2배치 방법 가지 수

//onesCount= 1의 개수
//twosCount=2의 개수
//onesCount + 2*twosCount= n

const solution = (n) => {
  const getFactorial = (n) => {
    if (n === 1) {
      return 1;
    }
    return n * getFactorial(n - 1);
  };

  let totalWays = 0;
  //2의 개수: 0~max개까지 반복
  for (let twosCount = 0; twosCount <= Math.floor(n / 2); twosCount++) {
    const onesCount = n - twosCount * 2;

    //한가지 종류만 있을 때- 1가지 return
    if (twosCount === 0 || onesCount === 0) {
      totalWays += 1;
      continue;
    }
    //두가지 종류 모두 있을 때 : n!/a!/b!
    totalWays +=
      getFactorial(onesCount + twosCount) /
      getFactorial(onesCount) /
      getFactorial(twosCount);
  }

  return totalWays;
};
// a개, b개 있을 때 조합 수

// 전체!
// /
// a!*b!

// 0,2: 1
// 2,1:
// 4,0: 1

// 6/2=3
console.log(solution(4));
