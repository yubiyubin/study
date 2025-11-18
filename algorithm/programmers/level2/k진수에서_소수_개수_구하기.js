const isPrime = (num) => {
  if (num === 1) {
    return 0;
  }

  for (let i = 1; i <= num ** 0.5; i++) {
    //약수가 있는 경우
    if (i !== 1 && num % i === 0) {
      return 0;
    }
  }

  return 1;
};

const solution = (n, k) => {
  const N = n.toString(k);
  const numsArr = N.split("0");
  let pCount = 0;

  for (let i = 0; i < numsArr.length; i++) {
    let currNum = numsArr[i];
    if (currNum) {
      pCount += isPrime(parseInt(currNum)) ? 1 : 0;
    }
  }

  return pCount;
};
console.log(solution(437674, 3));
