// n : 집합 원소 수
// s : 원소들의 합

//원소의 곱이 가장 큰 집합 오름차순으로 정렬 후 return
//if(n>s){return [-1]}

const solution = (n, s) => {
  //최고의 집합이 없는 경우
  if (n > s) {
    return [-1];
  }

  //s를 n개로 최대한 균일하게 분배
  const div = Math.floor(s / n);
  const remainder = s % n;

  const bestMultiSet = new Array(n - remainder).fill(div);

  for (let i = 0; i < remainder; i++) {
    bestMultiSet.push(div + 1);
  }
  return bestMultiSet;
};
