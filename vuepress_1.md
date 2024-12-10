# VuePress부터 Git Action까지
어째서 vuepress인가? 옆자리 선배가 써서.

# VuePress
이건 1.xx
## VuePress 다운로드
npm과 nodejs는 알아서 잘 설치하기. 다음은 버전 확인 명령.
```bash
npm -v
```
프로젝트 초기화하기. `-y`는 알아서. `-y` 안하면 계속 귀찮게 물어봄.
```bash
npm init -y
```
vuepress 설치. `i`는 `install`의 축약형. `-D`는 `--save-dev`의 축약형. `--save-dev`는 개발의존성<sub>devDependencies</sub>임. 즉, 배포 시에 안들어감.
```bash
npm i -D vuepress
```
> `vuepress`를 깔고나면 아래는 알려진 취약점이 프로젝트에 존재한다고 알려준다. 해결법도 알려준다.
> ```bash
> 97 vulnerabilities (2 low, 69 moderate, 23 high, 3 critical)
> 
> To address issues that do not require attention, run:
>   npm audit fix
> 
> To address all issues (including breaking changes), run:
>   npm audit fix --force
> ```
> `npm audit fix` 했더니 버전을 낮추란다. git pages 만들거니 일단은 무시..
> ```bash
> fix available via `npm audit fix --force`
> Will install vuepress@0.14.11, which is a breaking change
> ```

## 파일 구성
`-p`로 `docs/asdf`식으로 내려갈 수 있음.
```bash
mkdir docs
echo '# Hello VuePress' > docs/README.md
```
`package.json` `scripts`에 내용 추가. 내용 추가 전엔 `scripts`에 `"test"`만 있을 것임.
```json
{
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
}
}
```

## 테스트
```bash
npm run dev
```
결과문
```bash
success [15:58:10] Build 510860 finished in 34263 ms!
> VuePress dev server listening at http://localhost:8080/
```
실행 결과
![실행 결과](/assets/image.png)
갈 길이 멀다.. `:(`

## 수정
윈도우 특수성 때문에 이렇다. `README.md`가 `UTF-16LE`로 저장되어서 위 이미지처럼 나온 것. 윈도우에서 아래처럼 하거나 그냥 `VSCode`같은 ide에서 파일을 만들어주도록 하자.. `:(`
```bash
Out-File -FilePath docs/README.md -InputObject '# Hello VuePress' -Encoding UTF8
```
`linux`나 `mac`은 기본적으로 `UTF-8`인데 불안하면 아래처럼 하면 됨
```bash
echo "Hello VuePress" | iconv -t UTF-8 > docs/README.md
```
![실행 결과2](/assets/image2.png)

# 배포
## config.js 등 구성요소 채우기
docs/.vuepress/config.js

## 로컬용
`package.json`
```bash
"deploy": "vuepress build docs && gh-pages -d docs/.vuepress/dist"
```
```bash
npm i -D gh-pages
```
```bash
npm run deploy
```

## 깃허브 액션
아래와 같이 작성. main에 파일이 올라가면 자동으로 pages 업데이트.
```yaml
name: Deploy VuePress to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      # Checkout the repository
      - name: Checkout Repository
        uses: actions/checkout@v3

      # Install Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
      
      # Install dependencies
      - name: Install Dependencies
        run: npm install

      # Build the project
      - name: Build VuePress
        run: npm run build

      # Deploy to GitHub Pages
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/.vuepress/dist
```
`with` 안에 적지 않은 아래 항목은 자동 생성.
|k|v|
|-|-|
|user_name|github-actions[bot]|
|user_email|github-actions[bot]@users.noreply.github.com|
|commit_message|"Deploy: <날짜 및 시간>" (자동 생성)|
|publish_branch|gh-pages|