import React, { Component } from 'react';
import cx from 'classnames';
import Proptypes from 'prop-types';
import moment from 'moment';

const Week = () => (
    <div className="week">
        <span className="sun holiday">日</span>
        <span className="mon">一</span>
        <span className="tue">二</span>
        <span className="wed">三</span>
        <span className="thu">四</span>
        <span className="fri">五</span>
        <span className="sat holiday">六</span>
    </div>
);

const YearMonth = ({
    year,
    month,
    isMobile,
}) => (
    <div className="year_month">
        <p className="title">{`${year}年${month}月`}</p>
        {
            isMobile ? null : <Week />
        }
    </div>
);

const Date = ({
    first,
    isBetween,
    date,
    txt = '',
    active = false,
    isStart = false,
    isEnd = false,
    isDisabled = false,
    isHover = false,
    onClick = (date) => { console.log(date) },
    onMouseEnter = () => {},
}) => {
    if (!date) return <div className="date"></div>;
    const style = !first ? null : {
        'gridColumnStart': first
    };
    const thisDay = moment(date);
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
            onClick={() => {
                if (isDisabled) return;
                onClick(thisDay.format('YYYY-MM-DD'));
            }}
            onMouseEnter={() => {
                if (isDisabled) return;
                onMouseEnter(thisDay.format('YYYY-MM-DD'));
            }}
        >
            <div className="date_box">
                <span className="date_num">{thisDay.format('D')}</span>
                <span className="txt">{txt}</span>
            </div>
        </div>
    );
};

class CalendarBox extends Component {
    static defaultProps = {
        selectedStartDate: '',
        selectedEndDate: '',
        startTxt: '去程',
        endTxt: '回程',
        minDay: null,
        maxDay: null,
        startMonth: moment().format(),
        isMobile: false,
        setHoverDate: () => {},
    };
    calcDayArray (daysLength) {
        const {
            startMonth,
            selectedStartDate,
            selectedEndDate,
            startTxt,
            endTxt,
            minDay,
            maxDay,
            doubleChoose,
            // hoverDate,
            // setHoverDate,
        } = this.props;

        // 去回程都已選取
        const hasStartAndEnd = selectedStartDate.length > 0 && selectedEndDate.length > 0;

        return [...new Array(daysLength)].map((v, i) => {
            // 天數日期
            const thisDay = moment(startMonth).add(i, 'days');
            const isStart = thisDay.isSame(selectedStartDate);
            const isEnd = thisDay.isSame(selectedEndDate);
            // const isHover = thisDay.isSame(hoverDate);
            // const isBetween = doubleChoose && thisDay.isBetween(selectedStartDate, selectedEndDate || hoverDate);
            const isBetween = doubleChoose && thisDay.isBetween(selectedStartDate, selectedEndDate);
            const dateObj =  {
                date: thisDay.format(),
                active: isStart || isEnd,
                txt: isStart ?
                    startTxt :
                    isEnd ? endTxt : '',
                isBetween,
                isStart: hasStartAndEnd && isStart, // 是可以選兩天的月曆才加這個class
                isEnd: hasStartAndEnd && isEnd,
                isDisabled: (minDay && thisDay.isBefore(minDay)) || (maxDay && thisDay.isAfter(maxDay)),
                // isHover,
                // onMouseEnter: setHoverDate,
            };

            return dateObj;
        });
    }
    render () {
        const {
            onDateClick,
            setHoverDate,
            isMobile,
            startMonth,
        } = this.props;

        // 該月第一天是禮拜幾
        const start = moment(startMonth);
        const firstDay = start.weekday() + 1;
        // 該月有幾天
        const lastDay = start.daysInMonth();
        const dayArray = this.calcDayArray(lastDay);

        return (
            <div className="calendar_box">
                <YearMonth
                    year={start.format('YYYY')}
                    month={start.format('MM')}
                    isMobile={isMobile}
                />
                <div
                    className="month_box"
                    onMouseLeave={() => { setHoverDate(null) }}
                >
                    {
                        dayArray.map((v, i) => {
                            return (
                                <Date
                                    key={v.date}
                                    date={v.date}
                                    first={i === 0 ? firstDay : null}
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

CalendarBox.propTypes = {
    isMobile: Proptypes.bool,
};

export { Week };
export default CalendarBox;