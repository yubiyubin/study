# HTML

# HTML 기본 구조

```html
<!DOCTYPE html>   <!-- 문서 타입 선언 -->
<html>            <!-- 문서의 시작과 끝 -->
  <head>          <!-- 문서 정보 -->
    ...
  </head>
  <body>          <!-- 실제 화면에 보이는 부분 -->
    ...
  </body>
</html>
```

### 1. `<!DOCTYPE html>`

- 문서가 HTML5로 작성됐다는 선언
- 브라우저가 이 문서를 어떤 규칙으로 해석해야 하는지 명시

### 2. `<html>`

- **모든 HTML 요소를 감싸는 최상위 태그**

### 3. `<head>`

- 문서의 정보, 설정, 연결(CSS, meta, title 등) ⇒ 눈에 안 보인다!
- ex) 메타데이터(브라우저가 페이지를 어떻게 해석할지 알려준다), CSS, 제목, 외부리소스, js 연결 등

### 4. `<body>`

- 실제로 눈에 보이는 화면
- ex) 텍스트, 이미지, 버튼, 표, 영상 등

### + `<script>`

- 기능과 동작 부여
- `<head>` 안, 또는 `<body>` 안에 넣을 수 있음
- 보통 HTML 요소 다 그리고 script 실행되게 하려고 body 맨 끝에 넣는다!

<aside>
💡

단, **polyfill**과 같이 최우선 실행이 필수적인 `script`는 `head`에, 

변수 선언 같이 우선적으로 실행되는 것이 권장되는 `script`는 `body 상단`에 넣는다.

</aside>

<aside>
💡

### polyfill 이란?

**최신 자바스크립트 기능이나 브라우저 API를 지원하지 않는 오래된 브라우저에서도 똑같이 동작하도록 만들어주는 코드 ⇒ 구멍난 곳을 막아주는 패치**

</aside>

 

```html
<!DOCTYPE html>
<html lang="ko">
  <!-- HEAD -->
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!--검색엔진에서 요약 내용으로 표시 -->
    <meta name="description" content="검색 결과 요약" />

    <!-- 브라우저 탭에 표시되는 웹 페이지 제목 -->
    <title>웹페이지 제목</title>

    <!-- 외부 js 파일 가져오기 (src는 source의 약자) -->
    <script src="./index.js"></script>

    <!-- 외부 css 불러오기 (realtionship, hyper reference의 약자) -->
    <link rel="stylesheet" href="./style.css" />
  </head>

  <!-- BODY -->
  <body>
    <!-- 시멘틱 태그: 의미 내포=> 시각장애인의 웹 접근성, 코드 가독성 향상-->
    <h1>제목1</h1>
    <h2>제목2</h2>
    <h6>제목6</h6>
    <section></section>
    <article></article>
    <nav></nav>
    <aside></aside>
    <header></header>
    <footer></footer>
    <i></i>
    <p>문단</p>

    <!-- LIST: ordered/ unordered-->
    <ol>
      <li>항목1</li>
      <li>항목2</li>
    </ol>
    <ul>
      <li>항목</li>
      <li>항목</li>
    </ul>

    <!-- TABLE -->
    <!-- 테두리 두께-->
    <table border="1">
      <!-- TABLE ROW -->
      <tr>
        <!--TABLE HEADER -->
        <th>이름</th>
        <th>나이</th>
        <th>직업</th>
      </tr>
      <tr>
        <td>홍길동</td>
        <td>25</td>
        <td>개발자</td>
      </tr>
      <tr>
        <!-- TABLE DATA -->
        <td>이유빈</td>
        <td>27</td>
        <td>엔지니어</td>
      </tr>
    </table>

    <!-- UTIL성 태그: 의미보다는 편의성 위한 테그 -->
    <a href="https://www.naver.com">네이버로 이동</a>
    <button></button>
    <input type="text" placeholder="이름 입력" />
    <input type="checkbox" />
    <input type="file" />
    <label for="name">이름:</label>
    <input id="name" type="text" />
    <iframe></iframe>
    <form action="/submit" method="post">
      <input type="text" name="username" />
      <button type="submit">제출</button>

    <!-- DIV, SPAN -->
    <div>이건 블록</div>
    <span>이건 인라인</span>
    <div><span>찬영</span><span>유빈</span></div>

 
  </body>
</html>

```