# Hashmap

> HashMap은 **key를 통해 값을 매우 빠르게 찾아내는 자료구조**다. 내부적으로는 **해시 함수**를 사용해 키를 정수로 변환하고, 그 값을 **배열 인덱스처럼 활용**해 데이터를 저장한다.
> 

<aside>
💡

이 구조 덕분에 대부분의 경우 **검색, 삽입, 삭제가 O(1)** 에 가깝게 진행된다.

</aside>

# 1) 기본 원리

## ① 키를 Hashing

![image.png](Hashmap/image.png)

- key에 해시 함수를 적용 → 정수의 hash 로 변환한다.
    - ex) `"apple" → 29384`
- 그 정수를 **bucket**의 인덱스로 사용해 저장한다.

<aside>
💡

bucket은 해시값**에 대응되는 “칸”이다.**

각 bucket에는 **하나 이상의 key-value를 담을 수 있다.**

</aside>

## ② 충돌 처리 방법

1. **Chaining**
- 각 bucket이 Linked-list 또는 배열을 가지고 있다.
- ⇒ 충돌이 발생하면 **같은 버킷 안에 여러 key-value를 저장한다.**

![image.png](Hashmap/image%201.png)

1. **Open Addressing**
    - 배열 자체가 bucket 역할을 한다.
        
        ⇒ 충돌이 나면 다른 빈 칸을 찾아 저장한다.
        
        - ex) Linear Probing, Quadratic Probing
        
        ![image.png](Hashmap/image%202.png)
        

<aside>
💡

충돌은 **다른 키가 같은 인덱스**에 배정되는 것을 말한다!

</aside>

---

# 2) 자바스크립트에서의 해시맵

JS에서는 아래 두 가지가 사실상 해시맵 역할을 한다.

### ✔ `Object`

- 문자열 기반 키를 저장.
- 키 충돌 처리나 정렬 순서가 JS 내부 규칙대로 작동한다.

```jsx
const obj = { name: "yubin", age: 25 };
console.log(obj["name"]);

```

### ✔ `Map`

- 진짜 해시맵에 더 가까운 구조.
- **문자열뿐 아니라 객체, 함수 등 모든 값을 키로 사용 가능**.
- 순서 유지, 크기 확인(`size`), 성능도 안정적.

```jsx
const map = new Map();
map.set("name", "yubin");
map.set(123, "numberKey");
console.log(map.get("name")); // "yubin"

```

---