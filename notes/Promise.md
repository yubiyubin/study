# Promise

Promise는 비동기 작업이 맞이할 성공 혹은 실패를 나타낸다

![image.png](Promise/image.png)

promise 객체는 state와 result 2가지 속성을 가지고 있다

![image.png](Promise/image%201.png)

promise는 3가지 상태를 가질 수 있다

![image.png](Promise/image%202.png)

- pending 상태: result= undefined
- fullfilled 상태: result= 결과값
- rejected 상태: result= error 객체

# Promise 사용법

```jsx
const promise = new Promise((resolve, reject) => {
// 시간이 걸리는 작업
});
```

```jsx
new Promise((resolve, reject) => {
	try {
		// 작업 수행
		resolve(result);
	} catch (e) {
		reject(e);
	}
});
```

<aside>
🐱

Promise는 **생성 즉시 실행된다!
⇒ 원하는 시점에 실행하고 싶으면 promise를 함수 안에 넣고 원할 때 함수를 호출하면 된다~**

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

> promise가 성공(resolve) 하면 onFullFilled 함수가 실행된다.
> 
- `then`은 항상 새로운 Promise를 반환한다.
- onFullFilled 함수는 promise의 resolve값을 인자로 받을 수 있다.
    - ex)
        
        ```jsx
        Promise.resolve(10)
        .then(value => {
        console.log(value); // 10
        });
        ```
        

### 1-2. `promise.catch(onRejected)`

> promise가 실패(reject) 하면 onRejected 함수가 실행된다.
> 

### 1-3. `promise.finally(함수)`

## 2. 정적 메서드

<aside>
🐱

**정적(static) 메서드란, class**에 직접 소속되어, 인스턴스 없이 사용할 수 있는 함수다.

</aside>