import React, { Component } from 'react';
import cx from 'classnames';
import Proptypes from 'prop-types';
import moment from 'moment';
import './calendar.scss';

class CalendarBox extends Component {
    calcDayArray (daysLength) {
        const {
            year,
            month,
            selectedStartDate,
            selectedEndDate,
            startTxt,
            endTxt,
        } = this.props;

        return [...new Array(daysLength)].map((v, i) => {
            const date = i + 1;
            const dateObj =  {
                year,
                month,
                date,
                active: date === selectedStartDate || date === selectedEndDate,
                txt: (date === selectedStartDate) ?
                    startTxt :
                    (date === selectedEndDate) ? endTxt : '',
                isBetween: date >= selectedStartDate && date <= selectedEndDate,
                isStart: date === selectedStartDate,
                isEnd: date === selectedEndDate,
            };

            return dateObj;
        });
    }
    render () {
        const {
            year,
            month,
            week,
            clickDate,
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
                                    onClick={clickDate}
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
                    onClick(`${year}/${month}/${date}`);
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
        year: moment().format('YYYY'),
        month: moment().format('MM'),
        week: ['日', '一', '二', '三', '四', '五', '六'],
        doubleMonth: false, // 單月曆或雙月曆
        doubleClick: false, // 選一天或選兩天
    };
    render () {
        const {
            doubleMonth,
            startDate,
            endDate,
        } = this.props;

        console.log(startDate);
        const start = startDate.split('-');
        const end = endDate.split('-');

        return (
            <div className="calendar">
                <CalendarBox
                    year={start[0]}
                    month={start[1]}
                    minDay={startDate}
                    maxDay={endDate}
                    selectedStartDate={11}
                    selectedEndDate={20}
                    startTxt="最早"
                    endTxt="最晚"
                />
                {
                    doubleMonth ?
                        <CalendarBox
                            year={2018}
                            month={10 + 1}
                            minDay={startDate}
                            maxDay={endDate}
                            startTxt="最早"
                            endTxt="最晚"
                        /> :
                        null
                }
            </div>
        );
    }
}

Calendar.propTypes = {
    clickDate: Proptypes.func,
    startDate: Proptypes.string,
};

export default Calendar;