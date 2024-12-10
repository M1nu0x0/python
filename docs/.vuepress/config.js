import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'ko-KR',

  title: 'VuePress',
  description: 'My first VuePress Site',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: ['/', '/get-started', '/python/'],
    sidebar: {
      '/python/': [
        {
          text: 'Python',
          children: [
            '1. Python 소개와 기본.md',
          ]
        }
      ]
    }
  }),

  bundler: viteBundler(),
})
