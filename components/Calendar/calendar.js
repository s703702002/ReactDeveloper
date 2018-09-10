import React, { Component, PureComponent } from 'react';
import cx from 'classnames';
import Proptypes from 'prop-types';
import {
    getYearAndMonth,
    getNowMonth,
} from '../../utils';
import CalendarBox from './CalendarBox';
import './calendar.scss';

class Calendar extends PureComponent {
    static defaultProps = {
        doubleMonth: false, // 單月曆或雙月曆
        doubleChoose: false, // 選一天或選兩天
    };
    state = {
        calendarStart: this.props.selectedStartDate || getNowMonth(),
        isMinMonth: false,
        isMaxMonth: false,
    };
    goNextMonth = () => {
        const {
            activeEnd,
            doubleMonth,
        } = this.props;
        const {
            calendarStart,
            isMaxMonth,
        } = this.state;

        if (isMaxMonth) return;

        const [year, month] = getYearAndMonth(calendarStart);
        const nextMonth = new Date(year, month, 1, 8);
        const nextTwo = new Date(year, month + 1, 1, 8);
        const actEnd = new Date(activeEnd);
        const alreadyMax = doubleMonth ?
            nextTwo.getTime() === actEnd.getTime()
            : nextMonth.getTime() === actEnd.getTime();

        this.setState(prevState => {
            return {
                calendarStart: nextMonth.toISOString().slice(0, 7),
                isMinMonth: false,
                isMaxMonth: alreadyMax,
            };
        });
    }
    goPrevMonth = () => {
        const {
            activeStart,
        } = this.props;
        const {
            calendarStart,
            isMinMonth,
        } = this.state;

        if (isMinMonth) return;

        const [year, month] = getYearAndMonth(calendarStart);
        const prevMonth = new Date(year, month - 2, 1, 8);
        const actStart = new Date(activeStart);
        const alreadyMin = prevMonth.getTime() === actStart.getTime();

        this.setState(prevState => {
            return {
                calendarStart: prevMonth.toISOString().slice(0, 7),
                isMinMonth: alreadyMin,
                isMaxMonth: false,
            };
        });
    }
    render () {
        const {
            doubleMonth,
            startDate,
            endDate,
            onDateClick,
            selectedStartDate,
            selectedEndDate,
            startTxt,
            endTxt,
            doubleChoose,
        } = this.props;

        const {
            calendarStart,
            isMinMonth,
            isMaxMonth,
        } = this.state;

        const props = {
            startDate,
            endDate,
            onDateClick,
            selectedStartDate,
            selectedEndDate,
            startTxt,
            endTxt,
            doubleChoose,
        };

        const [year, month] = getYearAndMonth(calendarStart);
        const startMonth = new Date(year, month - 1, 1, 8);
        const nextMonth = new Date(year, month, 1, 8);

        return (
            <div className="calendar">
                <button
                    className={cx('prev', {
                        disabled: isMinMonth,
                    })}
                    onClick={this.goPrevMonth}
                />
                <button
                    className={cx('next', {
                        disabled: isMaxMonth,
                    })}
                    onClick={this.goNextMonth}
                />
                <CalendarBox
                    startMonth={startMonth}
                    {...props}
                />
                {
                    doubleMonth ?
                        <CalendarBox
                            startMonth={nextMonth}
                            {...props}
                        /> :
                        null
                }
            </div>
        );
    }
}

Calendar.propTypes = {
    onDateClick: Proptypes.func,
    startDate: Proptypes.string,
    doubleMonth: Proptypes.bool,
    doubleChoose: Proptypes.bool,
};

export default Calendar;