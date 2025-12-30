# 동시성 처리-비동기/병렬/EventLoop

# 동시성과 병렬성

## 1. 동시성

: 여러 작업이 실제로 동시에 실행되지 않더라도, 논리적으로 동시에 진행되는 것처럼 보이게 만드는 설계 개념이다.

<aside>
🐱

비동기는 동시성을 만드는 방법 중에 하나다!

</aside>

## 2. 병렬성

: 여러 작업을 실제로 동시에 실행하는 **하드웨어 실행 개념이다.**

# 동기 처리와 비동기 처리

## 1. 동기 처리(Synchronous)

> 작업을 순서대로 하나씩 처리한다!
> 
- 직관적이지만, 하나가 느리면 전체가 멈춘다.(blocking)

<aside>
🐱

JavaScript의 실행 모델은 기본적으로 동기적이다.

</aside>

## 2. 비동기 처리(Asynchronous)

> 작업을 **시작만 시켜두고**, 완료 시점에 **알림(callback / promise / event)** 으로 처리한다.
> 

<aside>
🐱

비동기 처리는 동기 처리와 마친가지로  위에서부터 실행을 시작하지만, 완료 시점은 이벤트 루프가 정한 우선순위 규칙에 따라 결정된다.

</aside>

# 비동기와 병렬

<aside>
🐱

비동기는 작업을 기다리지 않는 실행 방식이며, 병렬 실행 여부와는 독립적이다.
⇒ 따라서 비동기는 병렬일 수도 있고 아닐 수도 있다.

</aside>

| 구분 | 설명 |
| --- | --- |
| 비동기 | 기다리지 않는 실행 방식 |
| 병렬 | 실제 동시에 실행 |
| 단일 스레드 비동기 | 병렬 아님 |
| 멀티 스레드 비동기 | 병렬 가능 |

# Event Loop

> Event Loop는 콜 스택이 비어 있을 때, 대기 중인 비동기 작업의 콜백을 언제 콜 스택에 올릴지 결정한다.
⇒ 비동기 작업을 **언제 실행할지 결정하는 관리자다.**
> 

![image.png](%EB%8F%99%EC%8B%9C%EC%84%B1%20%EC%B2%98%EB%A6%AC-%EB%B9%84%EB%8F%99%EA%B8%B0%20%EB%B3%91%EB%A0%AC%20EventLoop/image.png)

## 1. 동작 흐름

- Call Stack 실행 → stack 비면 queue에서 작업 하나를 꺼내서 call stack에 넣는다 ⇒ 무한 반복

<aside>
🐱

Call Stack은 지금 실행 중인 함수들의 실행 순서를 저장하는 공간이다.

</aside>

<aside>
🐱

비동기 작업은 **큐에 쌓였다가 Event Loop**가 하나씩 처리한다.

</aside>

## 2. Event Loop의 Queue 종류

> 이벤트 루프는 실행 대기열을 하나만 보지 않고, 우선순위가 다른 여러 큐를 관리한다. 그중 가장 기본이 Microtask Queue와 Task Queue다.
> 

![image.png](%EB%8F%99%EC%8B%9C%EC%84%B1%20%EC%B2%98%EB%A6%AC-%EB%B9%84%EB%8F%99%EA%B8%B0%20%EB%B3%91%EB%A0%AC%20EventLoop/image%201.png)

### 2)-1. Task Queue

- setTimeout
- setInterval
- I/O callback

### 2)-2.  Microtask Queue

- Promise.then
- async/await 후속 처리

<aside>
🐱

### Event Loop의 한 사이클

Call Stack이 비면 Microtask Queue를 먼저 전부 비우고, 이후 Task Queue에서 하나의 작업만 실행한다.

</aside>

<aside>
🐱

- Task는 하나씩, Microtask는 몰아서 처리한다.
- Microtask가 항상 먼저다!
</aside>

# Event Emitter (이벤트 전달 모델)

> EventEmitter란 어떤 사건(event)이 발생했음을 알리고 → 그 사건을 듣고 있는 함수들을 실행시키는 구조다! 
⇒ **함수를 나중에 자동 실행되게 등록해두는 시스템이다.**
> 
- `on` : 이벤트 **등록**
- `emit` : 이벤트 **발생**

<aside>
🐱

EventEmitter은 Node.js에서 기본 제공되는 **비동기 이벤트 도구**다.

</aside>

<aside>
🐱

### EventEmitter의 성질

- emit은 emit 시점에 등록된 on만 실행
- 이벤트는 저장되지 않음
- 하나의 이벤트에 여러 리스너 가능
- emit 자체는 동기 실행
</aside>

## 1. 핵심 용어 정리

| 용어 | 의미 |
| --- | --- |
| event | 발생한 사건 |
| emit | 사건 발생시키기 |
| on | 사건을 기다리기 |
| listener | 이벤트 발생 시 실행되는 함수 |
| EventEmitter | 이벤트 저장 + 실행 관리자 |

## 2. 기본 문법

### 2-1) 기본 사용법

- 이벤트 저장소 생성
- 이벤트 호출 시스템 생성

```jsx
const EventEmitter = require('events');
const emitter = new EventEmitter();
```

### 2-2) `.on()` - 이벤트 등록

```jsx
emitter.on('이벤트이름',(데이터) => {
// 이벤트 발생 시 실행될 코드
});
```

- `"이벤트이름"`이라는 사건이 발생하면, `이벤트 발생 시 실행될 코드`가 자동 실행된다!
- ex)
    
    ```jsx
    emitter.on('login', (user) => {
    console.log(${user} 로그인);
    });
    ```
    

### 2-3) `.emit()` - 이벤트 발생

> 해당 eventName에 등록된 모든 리스너를 호출하고, data를 인자로 전달한다.
> 

```jsx
emitter.emit('이벤트이름', 데이터);
```

- ex)
    
    ```jsx
    emitter.emit('login','kim');
    //출력: kim 로그인
    ```
    

### 2-4) `once()` — 한 번만 듣는 이벤트

```jsx
emitter.once('init',() => {
console.log('초기화');
});
```

```jsx
emitter.emit('init');// 실행
emitter.emit('init');// 무시
```

### 2-5) `off()` — 이벤트 해제

```jsx
const handler = () =>console.log('실행');

emitter.on('event', handler);
emitter.off('event', handler);

```

<aside>
🐱

 반드시 **같은 함수 참조**여야 제거된다!

</aside>

## 🔟 클래스와 함께 쓰는 패턴 (실전 필수)

### EventEmitter 상속

```jsx
constEventEmitter =require('events');

class UserService extends EventEmitter {
login(user) {
this.emit('login', user);
  }
}
```

```jsx
const service =new UserService();

service.on('login',(user) => {
console.log(user,'로그인');
});

service.login('kim');

```

👉 이게 **도메인 객체 + 이벤트** 결합 패턴이다.

---

## 11️⃣ 중앙 Event Bus 패턴 (가장 많이 씀)

```jsx
// bus.js
module.exports =new (require('events'))();

```

```jsx
// anywhere
const bus =require('./bus');

bus.on('save', handler);
bus.emit('save', data);

```

✔ 객체 간 직접 의존 제거

✔ 이벤트 중심 구조 완성