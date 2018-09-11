import 'babel-polyfill';
import { configure } from '@storybook/react';
import './common.css';

const req = require.context('../components', true, /preview\.js$/);

function loadStories() {
    req.keys().map(req);
}

configure(loadStories, module);