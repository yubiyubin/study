# readline

> readline은 Node.js 환경에서 **터미널로부터 입력을 받고**, **출력도 제어할 수 있게 해주는 기본 내장 모듈**이다. ⇒ 터미널 기반 인터랙티브 프로그램 만들 때 가장 많이 쓰인다!
> 

---

# 1) 기본 불러오기 패턴

```jsx
//1. 모듈 불러오기
const readline = require('readline');

//2. 인터페이스(입출력 통로) 만들기
const rl = readline.createInterface({
  input: process.stdin, //input: 터미널에서 입력 받는 내용
  output: process.stdout //output: 터미널에서 출력되는 내용
});

```

---

# 2) 입력 -`rl.on('line', ...)`

- 사용자가 한 줄 입력할 때마다 `line` 이벤트가 발생한다.
- exit 같은 커맨드를 만들어서 종료 조건도 만들 수 있다.

```jsx
rl.on("line", (input) => {
  if (input === "exit") {
    console.log("종료합니다.");
    rl.close();
  } else {
    console.log(`입력한 값: ${input}`);
  }
});
```

---

# 3) 자주 쓰는 이벤트, 메서드

### 3-1) 이벤트

| 이벤트 | 의미 |
| --- | --- |
| line | 사용자가 한 줄 입력 후 Enter |
| close | Ctrl + D 입력 또는 `rl.close()` 입력 시 
⇒ 인터페이스 종료  |
| SIGINT | Ctrl+C 입력 시 |

### 3-2) 메서드

| 메서드 | 의미 |
| --- | --- |
| setPrompt | 프롬프트 문구 설정 |
| prompt | 설정한 문구 출력(입력 대기) |
| close | 인터페이스 종료 |

# + 예시

```jsx
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.setPrompt("명령> ");
rl.prompt();

rl.on("line", (cmd) => {
	switch (cmd) {
		case "help":
			console.log("사용 가능한 명령: help, exit");
			break;
		case "exit":
			rl.close();
			return;
		default:
		console.log(알 수 없는 명령: ${cmd});
}
rl.prompt();
});

rl.on("close", () => {
	console.log("프로그램 종료");
});
```