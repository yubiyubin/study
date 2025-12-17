# JS 모듈화

> require는 **다른 파일의 실행 결과를 참조로 가져온다**.
> 

# 1️⃣ 내보내기 `module.exports`

```jsx

module.exports = 상수명/클래스명/함수명;
```

<aside>
🐱

파일 안의 모든 걸 내보내는 게 아니라 **내보낸 것만 접근 가능하다!**

</aside>

---

## 2️⃣ 가져오기

```jsx
const 상수명/클래스명/함수명  =require("export 파일의 파일경로");
```

- ex) export을 쓴 파일이 현재 파일과 같은 폴더에 있는 `a.js` 일 때 :`require("./a")`
    
    → `a.js`를 **실행**
    
    → `module.exports`에 담긴 **결과 객체를 반환**
    

<aside>
🐱

- 객체(참조값)를 export하면 **모듈 간에 같은 객체를 공유한다.**
⇒ 수정하면 **원본이 바뀐다.**
- 변수(원시값) 를 export하면 값 복사처럼 동작한다.
</aside>

<aside>
🐱

객체에 담아서 여러 개의 함수/상수/클래스를 동시에 export하고, require 시 구조분해로 할당해 사용할 수 있다!

ex)
module.exports = { 함수1, 함수2, 상수1, 클래스2 };

const {함수1, 함수2, 상수1, 클래스2 } = require('파일경로');

</aside>