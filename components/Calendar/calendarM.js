import React, { Component, PureComponent } from 'react';
import cx from 'classnames';
import Proptypes from 'prop-types';
import {
    getYearAndMonth,
    getNowMonth,
} from '../../utils';
import CalendarBox, { Week } from './CalendarBox';
import './calendar.scss';

const DateLabel = ({
    isStart = false,
    isActive = false,
    title,
    date,
    onClick = () => {},
}) => {
    const d = date.split('-');
    const MM = d.length > 1 && d[1];
    const DD = d.length > 1 && d[2];

    return (
        <div
            className={cx({
                'start_section': isStart,
                'end_section': !isStart,
                active: isActive,
            })}
            onClick={onClick}
        >
            <h5 className="title">{title}</h5>
            <div className="date">
                {
                    !date.length ?
                        null :
                        `${MM}月${DD}日`
                }
            </div>
        </div>
    );
};
class CalendarM extends PureComponent {
    static defaultProps = {
        doubleChoose: false, // 選一天或選兩天
        activeInput: 0,
        startLabelTitle: '去程',
        endLabelTitle: '回程',
    };
    state = {
        calendarStart: getNowMonth(),
        selectedStartDate: this.props.selectedStartDate || '',
        selectedEndDate: this.props.selectedEndDate || '',
        activeInput: this.props.activeInput,
    };
    checkDate (isStart, date) {
        if (isStart) return true;

        const {
            selectedStartDate,
        } = this.state;

        const select = new Date(selectedStartDate);
        const newSelect = new Date(date);

        if (newSelect.getTime() < select.getTime()) {
            alert('回程不可小於出發日');
            return false;
        }

        return true;
    }

    onDateClick = (date) => {
        const {
            activeInput,
            selectedStartDate,
        } = this.state;

        const {
            doubleChoose,
        } = this.props;

        const isStart = (activeInput === 0);
        const startDateValue = isStart ? date : selectedStartDate;
        const endDateValue = isStart ? '' : date;
        const isValid = this.checkDate(isStart, date);

        if (!isValid) return;

        this.setState(prevState => ({
            ...prevState,
            selectedStartDate: startDateValue,
            selectedEndDate: endDateValue,
            activeInput: doubleChoose ?
                (isStart ? 1 : 0)
                : 0,
        }));
    }
    switchLabel = (target) => {
        this.setState(prevState => ({
            ...prevState,
            activeInput: target,
        }));
    }
    render () {
        const {
            startDate,
            endDate,
            startTxt,
            endTxt,
            doubleChoose,
            startLabelTitle,
            endLabelTitle,
        } = this.props;

        const {
            calendarStart,
            activeInput,
            selectedStartDate,
            selectedEndDate,
        } = this.state;

        const props = {
            startDate,
            endDate,
            selectedStartDate,
            selectedEndDate,
            startTxt,
            endTxt,
            doubleChoose,
            isMobile: true,
            onDateClick: this.onDateClick,
        };

        const [year, month] = getYearAndMonth(calendarStart);

        // M版月曆一次顯示7個月
        const calendarArray = [0, 1, 2, 3, 4, 5, 6].map((v, i) => {
            return new Date(year, month - 1 + i, 1, 8);
        });

        return (
            <div className="calendar">
                <div className="label_box">
                    <div className="selected_info">
                        <DateLabel
                            isStart
                            isActive={activeInput === 0}
                            title={startLabelTitle}
                            date={selectedStartDate}
                            onClick={() => { this.switchLabel(0) }}
                        />
                        {
                            doubleChoose ?
                                <DateLabel
                                    isActive={activeInput !== 0}
                                    title={endLabelTitle}
                                    date={selectedEndDate}
                                    onClick={() => { this.switchLabel(1) }}
                                /> :
                                null
                        }
                    </div>
                    <Week />
                </div>
                <div className="calendar_content">
                    {
                        calendarArray.map(v => (
                            <CalendarBox key={v} startMonth={v} {...props} />
                        ))
                    }
                </div>
            </div>
        );
    }
}

CalendarM.propTypes = {
    onDateClick: Proptypes.func,
    startDate: Proptypes.string,
    doubleChoose: Proptypes.bool,
    activeInput: Proptypes.oneOf([0, 1]),
    startLabelTitle: Proptypes.string,
    endLabelTitle: Proptypes.string,
};

export default CalendarM;