//영문 대소문자, 숫자, 공백(" "), 마침표("."), 빼기 부호("-")

//Head: 문자, 1글자 이상
//Number: 숫자, 1글자 이상-5글자 이하, 0포함 가능
//Tail: 문자 또는 숫자, 0글자 이상

//1. head 전부 대문자로 만들기
//2. head 문자 순서대로 정렬
//3. toUpperCase(head)가 동일한 경우: 앞의 0은 제외하고,  number 숫자 순으로 정렬
//4. upperCase head, 앞의 0제외 number 같은 경우: 원래 입력 순서 유지

const solution = (files) => {
  //parsedFiles= [{원래 head: ,대문자 head: ,원래 number:, 0제거 number:,tail:, originalIndex: , newIndex: }] 로 분리
  const parsedFiles = files.reduce((acc, e, i) => {
    const currFileDict = parseFile(e);
    currFileDict.origIndex = i;
    acc.push(currFileDict);
    return acc;
  }, []);

  //대문자 head 기준 정렬
  parsedFiles.sort((a, b) => {
    if (a.upperHead > b.upperHead) {
      return 1;
    }
    if (a.upperHead < b.upperHead) {
      return -1;
    }
    //head가 같은 경우- trimmedNums비교
    if (a.trimmedNums > b.trimmedNums) {
      return 1;
    }
    if (a.trimmedNums < b.trimmedNums) {
      return -1;
    }
    //trimmedNums 같은 경우-처음 인덱스 비교
    if (a.origIndex > b.origIndex) {
      return 1;
    }
    return -1;
  });

  const parsedFileNames = parsedFiles.map(
    (v) => v.origHead + v.origNums + v.tail
  );
  return parsedFileNames;

  function parseFile(file) {
    const currFileDict = {};
    //number 부분 추출: 1~5글자 이하의 연속된 숫자
    const currNumInfo = file.match(/\d{1,5}/);

    currFileDict.origNums = currNumInfo[0];
    const numStartIndex = currNumInfo.index;
    const numEndIndex = currNumInfo.index + currFileDict.origNums.length;
    //number 앞부분의 0제거
    currFileDict.trimmedNums = Number(currFileDict.origNums);

    //head 부분 추출: 처음 ~ number 부분 시작 index 전까지
    currFileDict.origHead = file.slice(0, numStartIndex);
    //head 대문자화
    currFileDict.upperHead = currFileDict.origHead.toUpperCase();

    //tail 부분 추출: number 부분 끝 index ~ 마지막까지
    currFileDict.tail = file.slice(numEndIndex);

    return currFileDict;
  }
};

const a = "foo010bar020.zip";
const b = "foo9.txt";
const c = "a-15";
solution([
  "F-5 Freedom Fighter",
  "B-50 Superfortress",
  "A-10 Thunderbolt II",
  "F-14 Tomcat",
]);
