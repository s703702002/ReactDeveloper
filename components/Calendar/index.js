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
                activeStart="2017-12"
                activeEnd="2019-02"
                startDate="2018-09-03"
                endDate="2018-12-20"
                selectedStartDate="2018-09-07"
                selectedEndDate="2018-11-07"
                onDateClick={date => {
                    console.log('date is', date);
                }}
            />
        </div>
    ));