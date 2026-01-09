//1. 총합 높은 장르 순서
//2. 장르 내에선 크기 순서
//2-1.크기 같은 경우 고유 번호 순서

const solution = (genres, plays) => {
  //장르별 재생 수 합계와 play 정보를 담은 genreDict생성
  const genreDict = plays.reduce((acc, play, i) => {
    const playsWithIds = [play, i];
    acc[genres[i]] ??= { playsSum: 0, plays: [] };
    acc[genres[i]].plays.push(playsWithIds);
    acc[genres[i]].playsSum += play;
    //최정예 2곡만 남기기
    acc[genres[i]].plays.sort((a, b) => {
      //play수 별로 내림차순 정렬
      if (a[0] > b[0]) {
        return -1;
      }
      if (a[0] < b[0]) {
        return 1;
      }
      //play수 같은 경우: ID 순으로 오름차순 정렬
      if (a[1] > b[1]) {
        return 1;
      }
      return -1;
    });
    if (acc[genres[i]].plays.length === 3) {
      acc[genres[i]].plays.pop();
    }
    return acc;
  }, {});

  //곡마다 [playsSum, play, id] 형태의 데이터로 변환
  const genreSet = new Set(genres);

  const playsInfos = [];
  [...genreSet].forEach((genre) => {
    const currGenreInfo = genreDict[genre];

    return currGenreInfo.plays.forEach(([play, ID]) =>
      playsInfos.push([currGenreInfo.playsSum, play, ID])
    );
  });

  //장르별 정렬
  const bestAlbums = playsInfos
    .sort((a, b) => {
      if (a[0] > b[0]) {
        return -1;
      }
      return 1;
    })
    .map((playInfo) => playInfo[2]);

  return bestAlbums;
};

solution(
  ["classic", "pop", "classic", "classic", "pop"],
  [500, 600, 150, 800, 2500]
);
