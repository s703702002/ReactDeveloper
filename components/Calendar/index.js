import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import Calendar from './calendar';

class Demo extends Component {
    state = {
        selectedStartDate: '2018-09-07',
        selectedEndDate: '',
    };
    render () {
        const {
            selectedStartDate,
            selectedEndDate,
        } = this.state;
        return (
            <div>
                <input
                    type="text"
                    placeholder="開始日期"
                    value={selectedStartDate}
                />
                {'~'}
                <input
                    type="text"
                    placeholder="結束日期"
                    value={selectedEndDate}
                />
                <Calendar
                    doubleChoose
                    doubleMonth
                    startTxt="最早"
                    endTxt="最晚"
                    activeStart="2017-12"
                    activeEnd="2019-02"
                    startDate="2018-09-03"
                    endDate="2018-12-20"
                    selectedStartDate={selectedStartDate}
                    selectedEndDate={selectedEndDate}
                    onDateClick={date => {
                        this.setState(prevState => ({
                            ...prevState,
                            selectedEndDate: date,
                        }));
                    }}
                />
            </div>
        );
    }
}

storiesOf('Component', module)
    .add('月曆', () => (
        <div>
            <Demo />
        </div>
    ));