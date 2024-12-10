import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'ko-KR',

  title: 'VuePress',
  description: 'My first VuePress Site',

  base: '/python/',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: ['/', '/get-started', '/python/'],
    sidebar: {
      '/python/': [
        {
          text: 'Python',
          children: [
            '1. Python 소개와 기본.md',
            '2. Python 기본 문법.md',
            '3. Python 객체 모델.md',
            '4. 클래스와 객체 지향.md',
            '5. Iterable. Iterator, Generator.md',
            '6. argparse와 스크립트 실행.md',
            '7. 라이브러리 작성과 관리.md',
            '8. 고급 Python 주제.md',
            '9. 최적화와 성능.md',
            '10. Built-in 라이브러리.md'
          ]
        }
      ]
    }
  }),

  bundler: viteBundler(),
})
