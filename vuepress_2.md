# VuePress부터 Git Action까지
어째서 vuepress인가? 옆자리 선배가 써서.

# [VuePress](https://vuepress.github.io/guide/getting-started.html)
2.xx 쓸 거임
## VuePress 다운로드
아래에서 `git workflow` 코드 작성해달라고 하면 `${root}/.github/workflows/deploy-docs.yml`이 생김. docs가 권장하는 `${root}`는 `vuepress-starter`임. 이거 사용 안할거면 `vuepress` `install`하고 코드 스스로 작성하면 됨.
```bash
npm init vuepress vuepress-starter
```
```bash
mkdir vuepress-starter
cd vuepress-starter
```
해당 폴더를 `vsc`같은 `ide`로 깃 기능을 사용했다면 (github 연동 등) `git init` 안해도 됨.
```bash
git init
npm init
```
``` bash
npm i -D vuepress@next
npm i -D @vuepress/bundler-vite@next @vuepress/theme-default@next
```
> `config.js`가 안생겼으면 하기
> ```bash
> mkdir docs
> mkdir docs/.vuepress
> ```
> `.vuepress` 안에 `config.js` 만들기
> ```js
> import { viteBundler } from '@vuepress/bundler-vite'
> import { defaultTheme } from '@vuepress/theme-default'
> import { defineUserConfig } from 'vuepress'
> 
> export default defineUserConfig({
>   bundler: viteBundler(),
>   theme: defaultTheme(),
> })
> ```

## 파일 구성
`-p`로 `docs/asdf`식으로 내려갈 수 있음.
```bash
mkdir docs
echo '# Hello VuePress' > docs/README.md
```
vuepress 추천 `.gitignore`
```
# VuePress default temp directory
.vuepress/.temp
# VuePress default cache directory
.vuepress/.cache
# VuePress default build output directory
.vuepress/dist
```

## 테스트
```bash
npm run docs:dev
```

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

## 깃페이지
아래처럼 `gh-pages` `/(root)`로 설정하지 않으면 `main`의 `/(root)`가 페이지의 메인으로 설정돼서 의도한대로 사이트가 작성되지 않음.
![alt text](/assets/image3.png)
의도: 깃허브 레포의 main page(/README.md)와 깃페이지의 main page(/docs/README.md)의 분리
