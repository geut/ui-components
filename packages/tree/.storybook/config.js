import * as storybook from '@storybook/react';

function loadStories() {
  const req = require.context('../stories', true, /[^\/]+.js$/);
  req.keys().forEach(filename => req(filename));
}

storybook.configure(loadStories, module);
