import React, { Component } from 'react';
import cx from 'classnames';
import Proptypes from 'prop-types';
import moment from 'moment';

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
    isStart = false,
    isEnd = false,
    isDisabled = false,
    isHover = false,
    onClick = (date) => { console.log(date) },
    setHoverDate = () => {},
}) => {
    if (!date) return <div className="date"></div>;
    const style = !first ? null : {
        'gridColumnStart': first
    };
    const thisDay = moment(`${year}-${month}-${date}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
    return (
        <div
            className={cx('date', {
                active: active,
                isBetween: isBetween,
                startDay: isStart,
                endDay: isEnd,
                disabled: isDisabled,
                isHover: isHover,
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
                    setHoverDate(thisDay);
                }}
            >
                <span className="date_num">{date}</span>
                <span className="txt">{txt}</span>
            </div>
        </div>
    );
};

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
            doubleChoose,
            hoverDate,
            setHoverDate,
        } = this.props;

        return [...new Array(daysLength)].map((v, i) => {
            // 天數日期
            const date = i + 1;
            const thisDay = moment(`${year}-${month}-${date}`, 'YYYY-MM-DD');
            const isStart = thisDay.isSame(selectedStartDate);
            const isEnd = thisDay.isSame(selectedEndDate);
            const isHover = thisDay.isSame(hoverDate);
            const isBetween = doubleChoose && thisDay.isBetween(selectedStartDate, selectedEndDate || hoverDate);
            const dateObj =  {
                year,
                month,
                date,
                active: isStart || isEnd,
                txt: (!doubleChoose) ?
                    null : isStart ?
                        startTxt : isEnd ?
                            endTxt : '',
                isBetween,
                isStart: doubleChoose && isStart, // 是可以選兩天的月曆才加這個class
                isEnd: doubleChoose && isEnd,
                isDisabled: (minDay && thisDay.isBefore(minDay)) || (maxDay && thisDay.isAfter(maxDay)),
                isHover,
                setHoverDate,
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
            setHoverDate,
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
                <div
                    className="month_box"
                    onMouseLeave={() => { setHoverDate(null) }}
                >
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
                                    isHover={v.isHover}
                                    setHoverDate={v.setHoverDate}
                                />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default CalendarBox;