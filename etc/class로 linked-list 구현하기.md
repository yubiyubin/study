# class로 linked-list 구현하기

# **기본 구조**

![image.png](class%EB%A1%9C%20linked-list%20%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0/c5b9f0d8-f87d-4833-adab-543b97c3f3d9.png)

## **1. Node 생성**

- 각 노드가 가져야 할 기본 정보 정의
- **value**: 저장할 값
- **next**: 다음 노드를 가리키는 포인터

```jsx
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
```

---

## **2. LinkedList 기본 틀 생성**

- **head**: 리스트의 첫 번째 노드
- **tail**: 리스트의 마지막 노드 (옵션이지만 사용하면 효율 증가)
- **length**: 전체 노드 개수

```jsx
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}
```

---

## **3. append() 기능**

- 맨 뒤에 노드를 추가하는 기능
- tail이 있으면 O(1)에 처리 가능

```jsx
append(value) {
  const newNode = new Node(value);

  if (this.head === null) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
  }

  this.length++;
}
```

---

## **4. prepend() 기능 (선택적)**

- 맨 앞에 노드를 추가하는 기능

```jsx
prepend(value) {
  const newNode = new Node(value);

  if (this.head === null) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    newNode.next = this.head;
    this.head = newNode;
  }

  this.length++;
}

```

## 예시

```jsx
// 노드 구조
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// 연결 리스트 구조
class LinkedList {
  constructor() {
    this.head = null;   // 첫 번째 노드
    this.tail = null;   // 마지막 노드
    this.length = 0;    // 총 노드 수
  }

  // 맨 뒤에 추가
  append(value) {
    const newNode = new Node(value);

    if (this.head === null) {
      // 리스트가 비어있으면 head와 tail 모두 새 노드
      this.head = newNode;
      this.tail = newNode;
    } else {
      // tail이 가리키는 마지막 노드 뒤에 새로운 노드를 붙임
      this.tail.next = newNode;
      this.tail = newNode; // tail을 새 노드로 업데이트
    }

    this.length++;
  }
}

```

---

### ✔️ Node 구조

- value → 해당 노드가 가진 값
- next → 다음 노드의 주소

### ✔️ LinkedList 구조

- head → 리스트의 시작 노드
- length → 현재 저장된 노드 개수

### ✔️ append 흐름

1. 새 노드 생성
2. head가 없으면 head에 바로 넣는다
3. head가 있으면 끝까지 이동
4. 끝 노드 next에 새 노드 연결

# ✔️ 기본적으로 포함하는 메서드 틀

tail을 쓰는 구조라면 일반적으로 다음 정도 메서드를 갖춘다:

```jsx
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) { /* 위 설명 */ }

  prepend(value) {
    const newNode = new Node(value);

    if (this.head === null) {
      // 리스트가 비어 있으면 head=tail=newNode
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 맨 앞에 붙임
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
  }

  // 특정 index 조회
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let curr = this.head;
    for (let i = 0; i < index; i++) curr = curr.next;
    return curr.value;
  }

  // 출력
  print() {
    let curr = this.head;
    let result = [];
    while (curr) {
      result.push(curr.value);
      curr = curr.next;
    }
    console.log(result.join(" → "));
  }
}

```

---

# ✔️ tail을 쓰는 기본 구조 핵심 요약

- head = 첫 노드
- tail = 마지막 노드