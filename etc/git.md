# Git

# Git init

> **현재 작업 폴더를 Git 저장소(Repository)로 만들기 위한 가장 첫 번째 명령어**
> 
- `git init`을 실행하면 : 평범한 폴더에 `.git` 이라는 숨겨진 폴더 생성 ⇒ 해당 폴더는 git이 버전 관리를 할 수 있는 영역이 된다!

# commit (버전 만들기)

- 데이터 수정/생성 → `git add 파일명` → 해당 파일이 **stage area**에 들어간다 ⇒ `git commit` 시 stage에 있는 파일들이 **repository**에 저장된다!

<aside>
💡

**stage**란? commit 대기 상태인 파일들이 있는 곳

</aside>

<aside>
💡

`git commit --help` 를 쓰면 commit시의 여러 옵션에 대한 도움말을 볼 수 있다

</aside>

<aside>
💡

### `git log -p`

> **각 버젼 사이의 차이점을 파악할 수 있다!**
> 
- --- : 이전 버젼의 내용 의미
- +++: 현재 버젼의 내용 의미
</aside>

# commit ID

> **commit ID**란? `git log` 를 썼을 때 commit 옆에 나오는 문구, commit message가 가리키는 버젼의 고유한 주소
> 
- `git diff`: 내가 작성한 코드와 이전 commit 과의 차이점을 보여준다!
- `git diff commitID1..commitID2` : commit ID1과 commitID2 사이의 소스코드 차이점을 보여준다

# 과거로 돌아가기

<aside>
💡

`git reflog` : 지금까지의 commit log 확인 가능

</aside>

## 1. reset

`git reset 돌아가고싶은commitID -- hard` : 입력한 commitID에 해당하는 commit이 최종 commit이 되고, 그 이후의 commit은 모두 사라진다

- 원리: `HEAD` 가 가리키는 파일을 입력한 commitID에 해당하는 파일로 변경한다!
    - reset 전의 commit은 `ORIG_HEAD` 파일에 저장되어 있다! ⇒ `git reset  ORIG_HEAD-- hard` 를 하면 reset 전으로 돌아간다!

<aside>
💡

공유하기 전에만 reset 사용! 공유 이후에 사용하면 안된다

</aside>

<aside>
💡

git은 대부분의 경우 정보를 우리 눈에 안 보이게 처리할 뿐, 영구적으로 삭제하지 않는다!

</aside>

<aside>
💡

### reset의 범위

![image.png](Git/image.png)

</aside>

## 2. revert

추후에 공부

# tree와 parent

- **tree**: 해당 commit 당시 파일의 이름과 담겨있는 내용 ⇒ 각 버전의 snapshot
    - (각 버젼마다 다른 tree를 가짐)
- **parent**: 직전 commit의 내용
- **object file**: object 디렉토리에 들어가는 파일
    - 종류
        - tree: 디렉토리의 파일명과 파일 내용(blob)을 담음
        - blob : 파일의 내용을 담음
        - commit

<aside>
💡

git은  파일의 이름이 달라도 내용이 같으면 같은 object 파일을 가르킨다! ⇒ 중복 제거

</aside>

<aside>
💡

누가, 어디에서 만들어도 같은 내용이면 같은 이름의 object 파일을 가르킨디! - 내용을 SHA 1을 사용한 해시값으로 저장

</aside>

# git의 버전 기록 과정

1. **수정 (Working Directory):** 개발자가 파일을 수정한다.
2. **Staging Area (=Index, cache):** `git add [파일명]` ⇒ 수정된 파일을 Staging Area로 올린다. 
3. **커밋 (Repository):** `git commit` ⇒ Staging Area에 준비된 스냅샷을 **Commit 메시지**와 함께 Repository에 영구적으로 기록한다!

![image.png](Git/image%201.png)

# branch

- 작업 시 자동으로 **master(또는 main)**이라는 branch를 생성해서 그 안에서 작업한다!
- `git branch branch명` 입력으로 master branch와 동일한 내용을 갖는 새로운 branch 생성 가능
- `branch checkout branch명` : 현재 branch에서 빠져나와 적은 branch명에 해당하는 branch로 이동 ⇒ 수정 사항은 해당 branch에만 기록된다!

<aside>
💡

`git log --branches --decorate --graph --oneline` 입력 시 현재의 branch들을 한눈에 볼 수 있다

</aside>

# 병합 방식 (merge, rebase)

## 1. `merge`

> `git merge branch명`: 현재 들어와있는 branch에 입력한 branch명의 내용을 병합 ⇒ 최신 commit이 동일해진다!
> 

### merge 방식

1. **fast forward :**  master이 가르키는 commit이 달라진다! ⇒ 별도의 commit 생성 x (분기 후 master이 가르키는 commit에 변화가 없는 경우 ⇒ conflict 발생 불가)
2. **그 외**: **merge commit 생성** (분기 후 master이 가르키는 commit에 변화가 생긴 경우)

### 3-way merge

- **base**를 참고해서 내용 병합
- **2-way merge**와 **3-way merge** 비교
    
    ![image.png](Git/image%202.png)
    
    - **2-way merge**는 **base**의 내용을 보지 않고 현재 파일과 병합하려는 파일 병합
    - 빨간 부분은 **conflict** 발생한 부분!

## 2. `rebase`

> `git rebase branch명`: 현재 branch의 commit들을 입력한 branch의 최신 커밋 뒤로 옮겨서, **동일한 base**를 갖도록 만든다. ⇒ 히스토리를 깔끔하게 선형으로 정리
> 

<aside>
💡

다른 branch의 최신 commit 위로 **현재 branch의 commit들을 하나씩 다시 적용하는 것**이다!

</aside>

## conflict 발생

> `conflict`: 같은 파일의 **같은 부분**을 **서로 다른 branch**에서 **서로 다르게 수정**한 경우 발생한다!
> 
- 서로 **다른 부분** 수정했을 때: 모든 수정 사항 반영 ⇒ 하나로 병합된다!
- **같은 부분**을 서로 다르게 수정했을 때: **conflict** 발생 → 해당 파일을 열면 다르게 수정된 부분이 표시되어있다! → 적절히 `수정` 후- `add`-`commit/rebase`하면 그 내용으로 병합된다~

<aside>
💡

merge 중 conflict 발생 시, index 0(base파일),1(현재 파일),2(병합하려는 파일) 가 생긴다! 

+conflict 상황이 아니면 index 0만 있어!

</aside>

### `merge` 와 `rebase` 의 conflict 해결 차이

- `merge` :두 branch를 **한 번에 합친다 ⇒** 충돌이 발생하면 **딱 한 번만** 수정하면 OK~
- `rebase` : 내 commit들을 **하나씩 순서대로** 다른 branch 위에 다시 올린다⇒ 충돌이 각 commit마다 생길 수 있다 — 여러번 충돌 수정해야할 수도 있다!
    
    <aside>
    💡
    
    충돌이 여러 번 발생할 때: 그 commit 시점에서 멈추고 → 수정 후→ `git add` → `git rebase --continue` 하면 다음 commit으로 넘어간다!
    
    </aside>
    

## merge와 rebase 비교

| 구분 | 설명 | 결과 형태 |
| --- | --- | --- |
| **Merge** | 두 브랜치를 합칠 때 새로운 병합 커밋(`merge commit`)을 만듦 | 비선형 (분기·병합 흔적 보존) |
| **Rebase** | 한 브랜치의 커밋들을 다른 브랜치의 끝으로 옮겨서 “다시 쌓음” | 선형 (히스토리 깔끔) |

![image.png](Git/image%203.png)

# stash

> `git stash` : 현재 작업 중인 변경사항(수정, 추가, 삭제 등)을 임시로 저장해두는 기능 ⇒ 지금 하던 걸 잠시 치워둔다!
> 

<aside>
💡

tracking(버전 관리)이 되고 있는 파일에만 적용 ⇒ untracked file에는 적용 안된다!

</aside>

- `git stash apply`: 감춰놓았던 내용 복구 (가장 최근에 추가한 stash에 적용)
- `stash list` : stash 목록 확인 가능
- `git stash drop`: 가장 최근에 추가한 stash 목록에서 삭제
- `git stash pop`: `git stash apply` 와 `git stash drop` 를 동시에 시행

# head

- git 생성 → `HEAD` 파일 자동 생성
    - `HEAD` 파일은 `ref/heads/master(현재branch명)` 파일을 가리키고,
    - `ref/heads/master` 파일은 가장 최근 commit의 `object ID` 값을 담고 있다

**⇒ git은 `HEAD` - `ref/heads/master` - `object ID` 를 보고 현재 checkout된 branch의 최신 commit을 알 수 있다!**

<aside>
💡

branch는 결국 heads에 속해 있는 파일을 의미한다.

</aside>

# 원격 저장소

- `git init --bare` 로 생성
    
    ⇒ 작업용 파일(.git)은 없이, 오직 **Git 데이터(버전 기록, 브랜치, commit 정보 등)** 만 담는 저장소를 만든다.
    
    <aside>
    💡
    
    만약 일반 저장소(`git init`)로 만들어버리면, 여러 사용자가 동시에 push할 때 **충돌(conflict)** 이 생길 수 있기 떄문에 bare로 생성한다!
    
    </aside>
    

git push

<aside>
💡

오픈 소스 코드 가져와서 사용하는 법

- `fork` 버튼을 누르면 그 소스코드를 복사해서 내가 마음대로 수정할 수 있다!
- `git clone 복사한소스코드주소 저장할디렉토리명`
1. **Fork** 버튼 누르기
    
    원본 저장소를 내 GitHub 계정으로 복사 ⇒  내가 마음대로 수정할 수 있다!
    
2. **Clone**
    
    내 계정에 복사된 저장소를 내 컴퓨터로 가져온다.
    
    ```bash
    git clone 복사한_저장소_URL 저장할_폴더명
    ```
    
3. **수정 후 push**
    
     코드 수정 → 커밋 → 내 GitHub 저장소로 올린다!
    
    ```bash
    git add .
    git commit -m "수정 내용"
    git push origin main
    ```
    

---

</aside>

git remote add origin 주소

upstream : 

## git pull & fetch

- 원격 저장소의 내용을 지역 저장소로 가져오는 방식에는 `git pull`  `git fetch` 2가지가 있다!

### **1. `git pull`**

> 원격 저장소의 변경 내용을 가져오고 자동으로 병합한다! ⇒ **`git fetch` + `git merge`**
> 

⇒ 결과적으로 **로컬 브랜치와 원격 브랜치의 commit이 동일해진다.**

```bash
git pull origin main
```

---

### 2. **`git fetch`**

> 원격 저장소의 변경 정보(최신 commit, 브랜치, 태그 정보)를 가져오기만 한다.
> 

⇒ 지역 저장소에는 아직 반영 X

- 이후 직접 확인 후 병합할 수 있다.
- 원격 저장소와 지역 저장소의 차이를 비교하여 변경 정보를 한 눈에 볼 수 있다!

<aside>
💡

`fetch`는 **확인**,  `pull`은 **즉시 반영**으로 이해하면 된다.

</aside>

# tag

> **tag 란? 특정 commit** 에 이름표를 붙여 그 시점을 쉽게 참조할 수 있도록 하는 기능이다.
> 
- ****가장 최근 커밋이 아니더라도 사용자가 원하는 **어떤 커밋에도 tag를 붙일 수 있다.**
- 태그 생성: `git tag 태그명 commitID`
    - commit ID 생략 시 `HEAD`(현재 checkout된 commit) 에 달린다.
- 태그 조회: `git tag`
- 태그 삭제: `git tag -d 삭제할태그명`
- 태그 push: `git push --tags`
- tag 종류
    - light- weight tag : 단순하게 특정 commit을 가르키는 tag
    - annotated tag : 주석으로 더 많은 정보를 달 수 있는 tag

# git을 이용한 프로젝트의 흐름

![image.png](Git/image%204.png)

- 가장 중요한 branch는 **master branch와**  **develop branch이다.**
    - **master branch**에 있는 내용이 사용자에게 공개되는 부분이다.
    - **develop branch**에서 내부적으로 개발을 진행한다!
- 추가할 기능마다 **feature branch**를 만들어서 작업한다.
- release branch 를 master branch에 병합할 때는 tag를 달아 해당 commit의 의미를 기록한다.