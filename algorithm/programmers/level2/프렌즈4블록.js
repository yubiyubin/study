//m: 세로
//n: 가로

const solution = (m, n, board) => {
  board = board.map((v) => v.split(""));

  let removeCount = 0;
  //현재 지울 수 있는 블록들 좌표 배열 찾기
  let removableBlocks = findRemovableBlocks(m, n, board);

  //지울 수 있는 블록이 있는 경우- 지우고 찾고 지우고 반복
  while (removableBlocks.length) {
    removeCount += removableBlocks.length;
    removeBlocks(removableBlocks);
    removableBlocks = findRemovableBlocks(m, n, board);
  }
  return removeCount;

  function findRemovableBlocks(m, n, board) {
    const removableBlocksSet = new Set();

    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        const startBlock = board[i][j];
        const neighborBlock1 = board[i][j + 1];
        const neighborBlock2 = board[i + 1][j];
        const neighborBlock3 = board[i + 1][j + 1];

        //블록 4개가 모두 같을 때 - 지워질 목록에 각 index 추가
        if (
          startBlock === neighborBlock1 &&
          startBlock === neighborBlock2 &&
          startBlock === neighborBlock3 &&
          startBlock !== 0
        ) {
          removableBlocksSet.add(`${i},${j}`);
          removableBlocksSet.add(`${i},${j + 1}`);
          removableBlocksSet.add(`${i + 1},${j}`);
          removableBlocksSet.add(`${i + 1},${j + 1}`);
        }
      }
    }
    return [...removableBlocksSet].map((v) => v.split(","));
  }

  function removeBlocks(removableBlocks) {
    //삭제 목록에 있는 블록 삭제하고, 그 자리에 0 표시
    removableBlocks.forEach(([i, j]) => (board[i][j] = 0));
    //끌어내리기
    for (let i = m - 1; i > 0; i--) {
      board[i].forEach((block, j) => {
        if (block === 0) {
          let currI = i;
          let upBlock;
          while (!upBlock) {
            currI -= 1;
            upBlock = board[currI][j];
            board[i][j] = upBlock;
            board[currI][j] = 0;
            if (currI === 0) {
              break;
            }
          }
        }
      });
    }

    return board;
  }
};

console.log(
  solution(6, 6, ["TTTANT", "RRFACC", "RRRFCC", "TRRRAA", "TTMMMF", "TMMTTJ"])
);
//TTTANT
// RRFACC
// RRR0CC
// TRR00A
// TTM00F
// TMMTTJ
