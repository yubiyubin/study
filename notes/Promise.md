# Promise

# Promise란?

> Promise는 비동기 작업의 진행 상태와 그 작업이 끝났을 때의 결과를 표현하는 객체다.

![image.png](Promise/image.png)

## Promise의 속성

- promise 객체는 state와 result 2가지 속성을 가지고 있다.
  ![image.png](Promise/image%201.png)

## Promise의 상태

- promise는 3가지 상태를 가질 수 있다.
  ![image.png](Promise/image%202.png)
  - pending 상태: result= undefined
  - fullfilled 상태: result= 결과값
  - rejected 상태: result= error 객체

# Promise 사용법

```jsx
const p = new Promise((resolve, reject) => {
  // 비동기 작업
  if (성공) {
    resolve(결과값);
  } else {
    reject(에러);
  }
});
```

<aside>
🐱

Promise는 \*\*생성 즉시 실행된다!

⇒ 원하는 시점에 실행하고 싶으면 return promise를 함수 안에 넣고 원할 때 함수를 호출하면 된다~\*\*

</aside>

# Promise 메서드

## 1. 인스턴스 메서드

<aside>
🐱

인스턴스 메서드란, class로 만들어진 instance(객체 하나)에 소속된 함수다.

- **객체가 있어야 호출 가능하다.**
- 클래스 자체에서는 못 쓴다!
</aside>

### 1-1. `promise.then(onFullfilled)`

> **promise가 성공(resolve) 하면 onFullFilled 함수가 실행된다.**

- `then`은 항상 새로운 Promise를 반환한다.
- onFullFilled 함수는 promise의 resolve값을 인자로 받을 수 있다.
  ```jsx
  Promise.resolve(10).then((value) => {
    console.log(value); // 10
  });
  ```
    <aside>
    🐱
    
    `then(onFulfilled, onRejected)` 에서 2개의 인자를 받으면  **성공 처리 + 실패 처리(catch 역할)** 를 **함께** 할 수 있지만, 이 경우의 onRejected은 이전 Promise의 reject만 처리하기 때문에, onFullfilled 안에서 발생한 에러는 잡지 못한다!
    ⇒ `then(onFullfilled).catch(onRejected)` 의 패턴을 권장한다.
    
    </aside>


### 1-2. `promise.catch(onRejected)`

> **promise가 실패(reject) 하면 onRejected 함수가 실행된다.**

- `catch` 는 항상 새로운 Promise를 반환한다.
- 현재 catch보다 앞에 있는 Promise 체인에서 발생한 에러는 전부 이 catch로 전달된다.
- onRejected 함수는 promise의 error값을 인자로 받을 수 있다.
  ```jsx
  Promise.reject("에러").catch((err) => {
    console.log(err);
  });
  ```
    <aside>
    🐱
    
    `catch`도 내부적으로는 `then(undefined, onRejected)` 와 같다.
    
    </aside>


### 1-3. `promise.finally(onFinally)`

> **promise의 성공/실패와 관계없이 onFinally 함수가 실행된다.**

<aside>
🐱

**finally는 값 처리 용도가 아닌 상태 정리 용도로 쓰인다!**

- finally는 값(인자)를 받지 않는다.
- return 값을 다음 체인에 전달하지 않는다 ⇒ 값을 변경할 수 없다!

⇒ 로딩 상태 헤제, 리소스 정리 등의 용도로 쓰인다.

ex)

```jsx
openConnection()
  .then(useConnection)
  .finally(() => closeConnection());
```

</aside>

## 2. 정적 메서드

<aside>
🐱

**정적(static) 메서드란, class**에 직접 소속되어, 인스턴스 없이 사용할 수 있는 함수다.

</aside>

| 메서드                                     | 역할                   |
| ------------------------------------------ | ---------------------- |
| Promise.resolve(값)                        | 즉시 성공 Promise 생성 |
| Promise.reject(에러)                       | 즉시 실패 Promise 생성 |
| Promise.all([promise1, promise2..])        | 모두 성공해야 성공     |
| Promise.race([promise1, promise2..])       | 가장 먼저 끝난 것      |
| Promise.allSettled([promise1, promise2..]) | 전부 끝날 때까지 대기  |
| Promise.any([promise1, promise2..])        | 하나라도 성공하면 성공 |

# `async`/ `await`

<aside>
🐱

`async` / `await`은 Promise를 then 체인 없이, 동기 코드처럼 읽히게 쓰기 위한 문법이다.

</aside>

## `async`

> 함수 앞에 `async` 를 붙이면, 그 함수의 반환값은 자동으로 Promise로 감싸져서 반환된다.

- async 함수가 반환하는 promise 형태
  | async 함수 내부  | 반환 Promise 상태  | 결과 값      |
  | ---------------- | ------------------ | ------------ |
  | `return 값`      | fulfilled          | 값           |
  | `return Promise` | fulfilled/rejected | Promise 결과 |
  | `throw 값`       | rejected           | 값           |
  | `return 없음`    | fulfilled          | undefined    |

## `await`

> async 함수 내부에서 Promise 또는 값을 받아, Promise 성공 시 result 값을 반환하고, 실패 시 에러를 throw한다.
>
> (값인 경우 그 값을 반환한다.)

<aside>
🐱

await은 **async 함수 내부**에서만 사용 가능하다!

</aside>

<aside>
🐱

await이 붙은 줄은 그 promise가 끝날 때까지 해당 async 함수 안에서만 다음 줄 실행을 막는다.

</aside>

ex)

- 받은 값을 변수에 할당
  ```jsx
  const result = await getData();
  ```
- 해당 promise가 실행될 때까지 기다렸다가 다음 줄 실행
  ```jsx
  await saveLog();
  console.log("저장 완료");
  ```
