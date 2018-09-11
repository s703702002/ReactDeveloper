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
                            startDate="2018-09-10"
                            endDate="2019-01-20"
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
                            endDate="2019-01-20"
                            selectedStartDate={selectedStartDate}
                            onDateClick={this.clickDate}
                        />
                }
            </ClickOutSide>
        );
    }
}

class MobileDemo extends Component {
    state = {
        selectedStartDate: '',
        selectedEndDate: '',
        activeInput: null,
    }
    calendar = null;
    showCalendar (target) {
        this.setState(prevState => ({
            ...prevState,
            activeInput: target,
        }));
    }
    handleClose = () => {
        this.setState({
            activeInput: null,
        });
    }
    handleConfirm = () => {
        const {
            selectedStartDate,
            selectedEndDate,
        } = this.calendar.state;

        this.setState(prevState => ({
            selectedStartDate,
            selectedEndDate,
            activeInput: null,
        }));
    }
    render () {
        const {
            selectedStartDate,
            selectedEndDate,
            activeInput,
        } = this.state;


        const s = {
            'position': 'fixed',
            'bottom': '10px',
            'right': '10px',
            'zIndex': '999',
        };

        const st = {
            'border': '1px solid #ddd',
            'margin': '5px',
            'padding': '5px',
        };

        return (
            <ClickOutSide onClickOutside={() => {
                this.setState(prevState => ({
                    ...prevState,
                    activeInput: null,
                }));
            }}>
                <div style={s}>
                    <button onClick={this.handleClose}>
                        close
                    </button>
                    <button onClick={this.handleConfirm}>
                        confirm
                    </button>
                </div>
                <div style={st} onClick={() => { this.showCalendar(0) }}>
                    <span>選擇開始日期: </span>
                    <span>{selectedStartDate}</span>
                </div>
                <div style={st} onClick={() => { this.showCalendar(1) }}>
                    <span>選擇結束日期: </span>
                    <span>{selectedEndDate}</span>
                </div>
                {
                    activeInput === null ?
                        null :
                        <CalendarM
                            doubleChoose
                            selectedStartDate={selectedStartDate}
                            selectedEndDate={selectedEndDate}
                            activeInput={activeInput}
                            startLabelTitle="入住日期"
                            endLabelTitle="退房日期"
                            ref={e => { this.calendar = e }}
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
    .add('Mobile版月曆', () => (
        <div>
            <h2>Mobile月曆</h2>
            <MobileDemo />
        </div>
    ));