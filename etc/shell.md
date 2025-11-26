# Shell

# Shell이란?

> **운영체제에게 명령을 전달하고, 그 결과를 받아볼 수 있게 만들어주는 인터페이스
> ⇒ 사람 ↔ 운영체제(OS)** 사이에서 통역을 해주는 프로그램이다!

- zsh, bash 등이 있다.
- 터미널에 입력하는 `cd`, `ls`, `mkdir`, `git` 같은 명령이 모두 shell을 통해 동작한다.
- ex)

  ```bash
  mkdir test
  ```

  - shell(zsh)이 입력한 명령을 해석 → 커널에게 “test 폴더 만들어줘” 라고 전달 → 커널이 작업 실행 → shell이 화면에 아무 메시지 없이 성공을 보여준다.

# Shell 명령어

> shell이 실행하는 실제 명령 - 대부분 디렉토리에 실제 파일 형태로 존재한다!

### 필수 Shell 명령어

**<디렉토리/파일 관련 명령>**

- `pwd` (print working directory): 현재 위치한 디렉토리 경로를 출력한다.
- `ls` (list): 현재 디렉토리 파일 목록을 보여준다.
- `cd` (change directory): 다른 디렉토리로 이동한다.
  - `cd..` : 상위 폴더로 이동한다.
  - `cd ~` : 사용자 홈 디렉토리로 이동한다.
- `mkdir` (make directory): 새 디렉토리를 만든다.
- `rmdir` (remove directory): 빈 디렉토리를 삭제한다.
- `mv` (move): 파일/폴더를 변경한다.
- `rm` (remove) : 파일/폴더를 삭제한다.
- `cp` (copy): 파일/폴더를 복사한다.
- `touch 파일명` : 새 파일 생성한다.
- `cat 파일명` : 텍스트 파일 내용 출력한다.

**<기타 명령>**

- `echo` : 문자열을 출력하거나 환경변수를 확인한다.
- `history` : 지금까지 친 명령어의 기록을 확인한다.
- `clear`: 터미널 화면을 깨끗하게 정리한다.
- `find [검색 시작 디렉토리] -name 파일명` : 지정한 디렉토리와 그 하위 디렉토리에서 해당 파일을 검색한다.

| 기호  | 의미                         | 예제                |
| ----- | ---------------------------- | ------------------- |
| `~`   | 홈 디렉토리                  | `cd ~/Documents`    |
| `.`   | 현재 디렉토리                | `ls .`              |
| `./`  | 현재 디렉토리 안의 파일/실행 | `./script.sh`       |
| `..`  | 부모 디렉토리                | `cd ..`             |
| `../` | 부모 디렉토리 기준           | `ls ../otherfolder` |

# Shell script

> **쉘 스크립트**는 shell에서 실행할 수 있는 명령어들을 모아놓은 파일이다.
> ⇒ 리눅스나 macOS 터미널에서 반복해서 입력하는 명령들을 **한 번에 실행되도록 정리한 파일!**

<aside>
💡

즉, 한 번 만들어 두면, 원하는 만큼 반복해서 **“자동화”할 수 있는 작은 프로그램**이다!

</aside>

### 쉘 스크립트 사용 방법

1. **파일 생성**

   ```bash
   touch myscript.sh
   ```

   - `.sh` 확장자는 관례일 뿐, 쉘 스크립트라는 의미를 알려주는 용도

2. VS code에서 파일 열기

   ```bash
    code [myscript.sh](http://myscript.sh/)
   ```

3. **자주 반복하는 작업 내용 작성**

   예: `myscript.sh` 안에

   ```bash
   #!/bin/bash
   echo "안녕하세요!"
   mkdir -p ~/backup
   ```

   - `#!/bin/bash` → bash로 실행하라는 의미
   - 여러 명령어를 순서대로 적어두면 한 번에 실행 가능

4. **실행 권한 부여**

   ```bash
   chmod +x myscript.sh
   ```

5. **스크립트 실행**

   ```bash
   ./myscript.sh
   ```

   - 내부 명령어가 순서대로 실행됨
   - 반복해서 실행 가능 → 매번 동일 작업 입력할 필요 없다!

   <aside>
   💡

   ```bash
   $ bash script.sh
   # bash 로 실행하면 권한을 주지 않고도 실행된다.
   ```

   </aside>

   ## shell script 기본 문법(bash 기준 )

   ### 1. 파일 시작 문구 (Shebang)

   ```bash
   #!/bin/bash
   ```

   - 스크립트를 어떤 shell로 실행할지 지정하는 줄.
   - `#`로 시작해도 **주석이 아니라 실행 환경 지정**이라서 동작한다.

   ***

   ### 2. 변수

   ```bash
   변수명="값"
   echo "$변수명" #사용 시 $를 붙인다!
   ```

   ***

   ### 3. 출력

   ```bash
   echo "메시지"
   ```

   ***

   ### 4. if문

   ```bash
   if [ 조건 ]; then
       실행문
   elif [ 다른조건 ]; then
       실행문
   else
       실행문
   fi  #if문 끝날 때 반드시 fi를 붙여준다!
   ```

   ***

   ### 5. for문

   ```bash
   for 변수 in 값1 값2 값3; do
       실행문
   done
   ```

   ***

   ### 6. while

   ```bash
   while [ 조건 ]; do
       실행문
   done
   ```

   ***

   ### 7. 함수

   ```bash
   함수명() {
       실행문
   }

   함수명  # 호출
   ```

   ***

   ### 8. 사용자 입력 구조(read)

   ```bash
   echo "이름 입력:"
   read name
   echo "Hi $name"
   ```

   ***

   ### 9. 명령 실행 결과를 변수에 넣기

   ```bash
   변수명=$(명령)
   ```

   ***

   ### 10. 파일/디렉토리 존재 검사

   ```bash
   if [ -e 파일명 ]; then
       echo "파일이 존재"
   fi

   if [ -d 디렉토리명 ]; then
       echo "디렉토리 존재"
   fi
   ```

   ***

   ### 11. 스크립트 실행 인자

   ```bash
   ./run.sh apple banana

   # 스크립트 내부에서:
   $1 → apple
   $2 → banana
   $@ → 모든 인자

   ```

   ***

   ### 12. 실행 권한 부여 + 실행

   ```bash
   chmod +x script.sh
   ./script.sh
   ```

   ***

   ### 13. 종료 구조

   ```bash
   exit 0   # 정상 종료
   exit 1   # 오류 종료
   ```

   ***

   ### ⇒ shell script 예시

   ```bash

   #!/bin/bash

   # 현재 날짜 (파일명용)
   today=$(date +%Y%m%d_%H%M)

   # daily_mission 내부의 모든 디렉토리 순회
   for dir in */; do
   # *패턴 : 마지막 부분이 패턴과 매치되는 모든 항목
   # */는 뒤에 슬래시가 붙는 모든 항목, 즉 디렉토리들만 매칭하는 패턴

       # 마지막 슬래시 제거 (디렉토리 이름만 뽑기)
       dirname="${dir%/}"
       # 변수%패턴 : 변수에서 특정 패턴 제거

       # 현재 디렉토리에 .cs 파일 존재하면-> cs_files에 배열 형태로 저장
       cs_files=("$dir"/*.cs)

       if [ -e "${cs_files[0]}" ]; then
       # -e: 파일/디렉토리가 실제로 존재하는지 검사

           # 1) 압축 파일 이름 만들기
           zip_name="backup_${dirname}_${today}.zip"

           # 2) .cs 파일만 zip으로 압축
           zip -j "$zip_name" "$dir"/*.cs
           # -j: 디렉토리 구조 제거하고 파일만 루트로 저장
           # zip [옵션] 압축파일명.zip 압축할파일들...

           # 3) scp로 가상머신의 /backup 경로에 복사
           scp "$zip_name" yubinlee@127.0.0.1:/backup
           #scp [옵션] [보낼파일] [받을위치]
           #scp는 ssh 연결을 기반으로 파일을 복사(전송)하는 명령어

           echo "$dirname → backup complete: $zip_name"
       else
           # .cs 파일 하나도 없으면
           echo "$dirname is empty"
       fi
   done
   ```

# 🟦 실행 순서

### 1) 스크립트 만들기

```bash
touch backup_cs.sh

```

### 2) 편집기로 붙여넣기

```bash
nano backup_cs.sh

```

→ 위 코드 전체 붙여넣기 → 저장

### 3) 실행 권한 부여

```bash
chmod +x backup_cs.sh

```

### 4) 실행

```bash
./backup_cs.sh

```
