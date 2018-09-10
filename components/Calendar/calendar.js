import React, { Component, PureComponent } from 'react';
import cx from 'classnames';
import Proptypes from 'prop-types';
import moment from 'moment';
import CalendarBox from './CalendarBox';
import './calendar.scss';

class Calendar extends PureComponent {
    static defaultProps = {
        doubleMonth: false, // 單月曆或雙月曆
        doubleChoose: false, // 選一天或選兩天
    };
    state = {
        calendarStart: this.props.selectedStartDate || moment().format('YYYY-MM'),
        isMinMonth: false,
        isMaxMonth: false,
        // hoverDate: null,
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

        const nextMonth = moment(calendarStart, 'YYYY-MM').add(1, 'months');
        const nextTwo = moment(calendarStart, 'YYYY-MM').add(2, 'months');
        const alreadyMax = doubleMonth ?
            nextTwo.isSame(activeEnd)
            : nextMonth.isSame(activeEnd);

        this.setState(prevState => {
            return {
                calendarStart: nextMonth.format('YYYY-MM'),
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

        const prevMonth = moment(calendarStart, 'YYYY-MM').subtract(1, 'months');
        const alreadyMin = prevMonth.isSame(activeStart);

        this.setState(prevState => {
            return {
                calendarStart: prevMonth.format('YYYY-MM'),
                isMinMonth: alreadyMin,
                isMaxMonth: false,
            };
        });
    }
    // setHoverDate = (dateString) => {
    //     this.setState(prevState => ({
    //         ...prevState,
    //         hoverDate: dateString,
    //     }));
    // }
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
            // hoverDate,
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
            // hoverDate,
            // setHoverDate: this.setHoverDate,
        };

        const startMonth = moment(calendarStart).format('YYYY-MM');
        const nextMonth = moment(calendarStart).add(1, 'months').format('YYYY-MM');

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