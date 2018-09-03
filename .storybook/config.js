import 'babel-polyfill';
import { configure } from '@storybook/react';

const req = require.context('../components', true, /index\.js$/);

function loadStories() {
    req.keys().map(req);
}

configure(loadStories, module);