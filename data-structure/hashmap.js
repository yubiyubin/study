const { Node } = require("./node");
const { LinkedList } = require("./linked-list");

//bucket size를 100으로 지정
const bucketSize = 100;
let mapSize = 0;

const getHashIndex = (key) => {
  let hashSum = 0;
  for (const keyLetter of key) {
    hashSum += keyLetter.charCodeAt(0);
  }
  const hashIndex = hashSum % bucketSize;
  return hashIndex;
};

//key-value entry(항목) 생성
// TODO
class HashNode extends Node {
  constructor(value, key) {
    super({ key, value, hashIndex: getHashIndex(key) });
  }
}

class HashMap {
  buckets = [];

  // 해당 키 존재 여부 return
  contains(key) {
    const currBucket = this.buckets[getHashIndex(key)];

    //1.해당 hashIndex의 bucket이 비어있는 경우
    if (!currBucket) {
      return false;
    }

    //2.bucket이 비어있지 않은 경우
    let currNode = currBucket.head;

    while (currNode.data.key !== key) {
      if (!currNode.next) {
        return false;
      }
      currNode = currNode.next;
    }

    return true;
  }

  // 해당 키와 매치되는 값 찾아서 return
  getValue(key) {
    let currBucket = this.buckets[getHashIndex(key)];
    //1.매치되는 키가 없을 때
    if (!map.contains(key)) {
      return undefined;
    }
    //2.매치되는 키가 있을 때
    while (currBucket.data.key !== key) {
      currBucket = currBucket.next;
    }
    return currBucket.data.value;
  }

  //key-value 값 추가
  put(value, key) {
    //1. 해당 키 값 이미 있는 경우 - 추가 안한다.
    if (map.contains(key)) {
      return;
    }
    //2. 해당 키 값 없는 경우
    mapSize += 1;

    const currNode = new HashNode(value, key);
    let currIndex = currNode.data.hashIndex;

    this.buckets[currIndex] ??= new LinkedList();
    this.buckets[currIndex].addOrInsert(currNode);
  }

  // 비어있는지 여부 Boolean return
  isEmpty() {
    if (mapSize === 0) {
      return true;
    }
    return false;
  }

  //전체 map 초기화
  clear() {
    this.buckets.fill(undefined);
    mapSize = 0;
  }

  // TODO: 전체 key 목록을 string 배열로 return
  // linked-list에도 key 추가
  keys() {
    const keysArr = [];
    for (let i = 0; i < bucketSize; i++) {
      if (!this.buckets[i]) {
        continue;
      }
      let currNode = this.buckets[i].head;
      while (currNode) {
        keysArr.push(currNode.data.key);
        currNode = currNode.next;
      }
    }
    return keysArr;
  }

  //해당 키에 있는 값 삭제
  remove(key) {
    //1.기존에 해당 키 없을 때- 동작 안 함
    if (!map.contains(key)) {
      return;
    }
    //2.해당 키 있을 때
    let currBucket = this.buckets[getHashIndex(key)];
    currBucket.delete(key);
    mapSize -= 1;
  }

  //기존에 key가 있으면 새 값으로 대체, 없으면 추가
  replace(value, key) {
    //1. 기존에 해당 key 있는 경우
    if (map.contains(key)) {
      const currNode = new HashNode(value, key);
      let currIndex = currNode.data.hashIndex;

      this.buckets[currIndex].replace(value, key);
    }
    //2. 해당 key 없는 경우
    this.put(value, key);
  }

  // 전체 아이템 개수 return
  size() {
    return mapSize;
  }
}

module.exports = { HashMap };
