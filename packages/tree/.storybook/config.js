import { create } from '@storybook/theming'
import * as storybook from '@storybook/react'

const theme = create({
  base: 'light',
  appBg: 'white',
  barBg: '#57b66b',
  barTextColor: 'white',
  brandTitle: 'GEUT - UI Components',
  brandUrl: 'https://github.com/geut',
  brandImage: 'https://pbs.twimg.com/profile_images/740551192628101120/JfizTtpC_400x400.jpg'
})

function loadStories () {
  const req = require.context('../stories', true, /[^/]+.js$/)
  req.keys().forEach(filename => req(filename))
}

storybook.addParameters({
  options: {
    theme
  }
})
storybook.configure(loadStories, module)
