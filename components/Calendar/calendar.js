import React, { Component } from 'react';
import cx from 'classnames';
import Proptypes from 'prop-types';
import moment from 'moment';
import './calendar.scss';

class CalendarBox extends Component {
    static defaultProps = {
        startTxt: '去程',
        endTxt: '回程',
        minDay: null,
        maxDay: null,
        year: moment().format('YYYY'),
        month: moment().format('MM'),
    };
    calcDayArray (daysLength) {
        const {
            year,
            month,
            selectedStartDate,
            selectedEndDate,
            startTxt,
            endTxt,
            minDay,
            maxDay,
        } = this.props;

        return [...new Array(daysLength)].map((v, i) => {
            // 天數日期
            const date = i + 1;
            const thisDay = moment(`${year}-${month}-${date}`, 'YYYY-MM-DD');
            const isStart = thisDay.isSame(selectedStartDate);
            const isEnd = thisDay.isSame(selectedEndDate);
            const dateObj =  {
                year,
                month,
                date,
                active: isStart || isEnd,
                txt: isStart ?
                    startTxt :
                    isEnd ? endTxt : '',
                isBetween: thisDay.isBetween(selectedStartDate, selectedEndDate),
                isStart,
                isEnd,
                isDisabled: (minDay && thisDay.isBefore(minDay)) || (maxDay && thisDay.isAfter(maxDay)),
            };

            return dateObj;
        });
    }
    render () {
        const {
            year,
            month,
            week,
            onDateClick,
        } = this.props;

        // 該月第一天是禮拜幾
        const firstDay = moment([year, month - 1, 1]).weekday() + 1;
        // 該月有幾天
        const lastDay = moment([year, month - 1]).daysInMonth();
        const dayArray = this.calcDayArray(lastDay);

        return (
            <div className="calendar_box">
                <YearMonth
                    year={year}
                    month={month}
                    week={week}
                />
                <div className="month_box">
                    {
                        dayArray.map(v => {
                            return (
                                <Date
                                    key={v.date}
                                    year={v.year}
                                    month={v.month}
                                    date={v.date}
                                    first={v.date === 1 ? firstDay : null}
                                    onClick={onDateClick}
                                    active={v.active}
                                    txt={v.txt}
                                    isBetween={v.isBetween}
                                    isStart={v.isStart}
                                    isEnd={v.isEnd}
                                    isDisabled={v.isDisabled}
                                />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

const YearMonth = ({
    year,
    month,
    week,
}) => (
    <div className="year_month">
        <p className="title">{`${year}年${month}月`}</p>
        <div className="week">
            <span className="sun holiday">日</span>
            <span className="mon">一</span>
            <span className="tue">二</span>
            <span className="wed">三</span>
            <span className="thu">四</span>
            <span className="fri">五</span>
            <span className="sat holiday">六</span>
        </div>
    </div>
);

const Date = ({
    first,
    isBetween,
    year,
    month,
    date,
    txt = '',
    active = false,
    isStart,
    isEnd,
    isDisabled,
    onClick = (date) => { console.log(date) },
}) => {
    if (!date) return <div className="date"></div>;
    const style = !first ? null : {
        'gridColumnStart': first
    };
    const thisDay = `${year}-${month}-${date}`;
    return (
        <div
            className={cx('date', {
                active: active,
                isBetween: isBetween,
                startDay: isStart,
                endDay: isEnd,
                disabled: isDisabled,
            })}
            style={style}
        >
            <div
                className="date_box"
                onClick={() => {
                    if (isDisabled) return;
                    onClick(thisDay);
                }}
                onMouseEnter={() => {
                    if (isDisabled) return;
                    console.log('滑鼠入', thisDay);
                }}
            >
                <span className="date_num">{date}</span>
                <span className="txt">{txt}</span>
            </div>
        </div>
    );
};

class Calendar extends Component {
    static defaultProps = {
        doubleMonth: false, // 單月曆或雙月曆
        doubleClick: false, // 選一天或選兩天
    };
    state = {
        calendarStart: this.props.selectedStartDate || moment().format('YYYY-MM'),
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
    render () {
        const {
            doubleMonth,
            startDate,
            endDate,
            onDateClick,
            selectedStartDate,
            selectedEndDate,
        } = this.props;

        const {
            calendarStart,
            isMinMonth,
            isMaxMonth,
        } = this.state;

        const start = calendarStart.split('-');
        const next = moment([start[0], start[1] - 1]).add(1, 'months');

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
                    year={start[0]}
                    month={start[1]}
                    minDay={startDate}
                    maxDay={endDate}
                    onDateClick={onDateClick}
                    selectedStartDate={selectedStartDate}
                    selectedEndDate={selectedEndDate}
                />
                {
                    doubleMonth ?
                        <CalendarBox
                            year={next.format('YYYY')}
                            month={next.format('MM')}
                            minDay={startDate}
                            maxDay={endDate}
                            onDateClick={onDateClick}
                            selectedStartDate={selectedStartDate}
                            selectedEndDate={selectedEndDate}
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
};

export default Calendar;