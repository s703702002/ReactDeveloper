import React, { Component } from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import Calendar from './calendar';
import CalendarM from './calendarM';
import { ClickOutSide } from '../../utils';

class Demo extends Component {
    static defaultProps = {
        doubleMonth: false,
    };

    state = {
        selectedStartDate: '',
        selectedEndDate: '',
        startInputValue: '',
        endInputValue: '',
        activeInput: null,
    };

    checkDate (isStart, date) {
        const {
            selectedStartDate,
        } = this.state;

        if (isStart) return true;

        if (moment(date).isBefore(selectedStartDate)) {
            alert('回程不可小於出發日');
            return false;
        }

        return true;
    }
    inputChange = (e) => {
        const { activeInput } = this.state;
        const value = e.target.value;
        const target = `${activeInput}InputValue`;
        this.setState(prevState => ({
            ...prevState,
            [target]: value,
        }));
    }
    inputFocus (target) {
        this.setState(prevState => ({
            ...prevState,
            activeInput: target,
        }));
    }
    clickDate = (date) => {
        const {
            activeInput,
            selectedStartDate,
        } = this.state;
        const isStart = (activeInput === 'start');
        const startDateValue = isStart ? date : selectedStartDate;
        const endDateValue = isStart ? '' : date;
        const isValid = this.checkDate(isStart, date);

        if (!isValid) return;

        this.setState(prevState => ({
            activeInput: isStart ? 'end' : null,
            selectedStartDate: startDateValue,
            selectedEndDate: endDateValue,
            startInputValue: startDateValue,
            endInputValue: endDateValue,
        }));
    }
    render () {
        const {
            selectedStartDate,
            selectedEndDate,
            startInputValue,
            endInputValue,
            activeInput,
        } = this.state;

        const {
            doubleMonth,
            startTxt,
            endTxt,
        } = this.props;

        const isStart = activeInput === 'start';
        const isEnd = activeInput === 'end';
        const style = {
            'borderColor': 'red',
        };

        return (
            <ClickOutSide onClickOutside={() => {
                this.setState(prevState => ({
                    ...prevState,
                    activeInput: null,
                }));
            }}>
                <input
                    type="text"
                    placeholder="開始日期"
                    value={startInputValue}
                    onChange={this.inputChange}
                    onFocus={() => { this.inputFocus('start') }}
                    style={isStart ? style : null}
                    readOnly
                />
                {'~'}
                <input
                    type="text"
                    placeholder="結束日期"
                    value={endInputValue}
                    onChange={this.inputChange}
                    onFocus={() => { this.inputFocus('end') }}
                    style={isEnd ? style : null}
                    readOnly
                />
                {
                    !activeInput ?
                        null :
                        <Calendar
                            doubleMonth={doubleMonth}
                            doubleChoose
                            startTxt={startTxt}
                            endTxt={endTxt}
                            activeStart="2017-12"
                            activeEnd="2019-02"
                            startDate="2018-09-03"
                            endDate="2018-12-20"
                            selectedStartDate={selectedStartDate}
                            selectedEndDate={selectedEndDate}
                            onDateClick={this.clickDate}
                        />
                }
            </ClickOutSide>
        );
    }
}

class OneChoose extends Component {
    static defaultProps = {
        doubleMonth: false,
    };

    state = {
        selectedStartDate: '',
        startInputValue: '',
        onFocus: false,
    };

    clickDate = (date) => {
        this.setState(prevState => ({
            onFocus: false,
            selectedStartDate: date,
            startInputValue: date,
        }));
    }

    inputChange = (e) => {
        const value = e.target.value;
        this.setState(prevState => ({
            ...prevState,
            startInputValue: value,
        }));
    }

    render () {
        const {
            selectedStartDate,
            startInputValue,
            onFocus,
        } = this.state;

        const {
            doubleMonth,
        } = this.props;

        const style = {
            'borderColor': 'red',
        };

        return (
            <ClickOutSide
                onClickOutside={() => {
                    this.setState(prevState => ({
                        ...prevState,
                        onFocus: false,
                    }));
                }}
            >
                <input
                    type="text"
                    placeholder="選擇日期"
                    value={startInputValue}
                    onFocus={() => { this.setState(prevState => ({
                        ...prevState,
                        onFocus: true,
                    })); }}
                    onChange={this.inputChange}
                    readOnly
                    style={onFocus ? style : null}
                />
                {
                    !onFocus ?
                        null :
                        <Calendar
                            doubleMonth={doubleMonth}
                            activeStart="2017-12"
                            activeEnd="2019-02"
                            startDate="2018-09-03"
                            endDate="2018-12-20"
                            selectedStartDate={selectedStartDate}
                            onDateClick={this.clickDate}
                        />
                }
            </ClickOutSide>
        );
    }
}

storiesOf('Component', module)
    .add('月曆', () => (
        <div>
            <h2>雙月曆複選</h2>
            <Demo doubleMonth />
            <h2>單月曆複選</h2>
            <Demo startTxt="最早" endTxt="最晚" />
            <h2>雙月曆單選</h2>
            <OneChoose doubleMonth />
            <h2>單月曆單選</h2>
            <OneChoose />
        </div>
    ))
    .add('M版月曆', () => (
        <CalendarM
            doubleChoose
            activeStart="2017-12"
            activeEnd="2019-02"
            startDate="2018-09-05"
            endDate="2019-03-20"
            // selectedStartDate="2018-09-13"
            // selectedEndDate="2018-10-13"
        />
    ));