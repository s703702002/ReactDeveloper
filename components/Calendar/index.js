import React from 'react';
import { storiesOf } from '@storybook/react';
import Calendar from './calendar';


storiesOf('Component', module)
    .add('月曆', () => (
        <div>
            <Calendar
                doubleMonth
                startTxt="最早"
                endTxt="最晚"
                startDate="2018-09-03"
                endDate="2019-02-23"
            />
        </div>
    ));