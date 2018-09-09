import React, { Component, PureComponent } from 'react';
import cx from 'classnames';
import Proptypes from 'prop-types';
import moment from 'moment';
import CalendarBox, { Week } from './CalendarBox';
import './calendar.scss';

const DateLabel = ({
    isStart = false,
    isActive = false,
    title,
    date,
    onClick = () => {},
}) => {
    const today = moment(date, 'YYYY-MM-DD');
    const isValid = today.isValid();
    const MM = today.format('MM');
    const DD = today.format('DD');
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
                    !isValid ?
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
    };
    state = {
        calendarStart: this.props.selectedStartDate || moment().format('YYYY-MM'),
        selectedStartDate: this.props.selectedStartDate || '',
        selectedEndDate: this.props.selectedEndDate || '',
        activeInput: this.props.activeInput,
    };
    checkDate (isStart, date) {
        if (isStart) return true;

        const {
            selectedStartDate,
        } = this.state;

        if (moment(date).isBefore(selectedStartDate)) {
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

        const isStart = (activeInput === 0);
        const startDateValue = isStart ? date : selectedStartDate;
        const endDateValue = isStart ? '' : date;
        const isValid = this.checkDate(isStart, date);

        if (!isValid) return;

        this.setState(prevState => ({
            ...prevState,
            selectedStartDate: startDateValue,
            selectedEndDate: endDateValue,
            activeInput: isStart ? 1 : 0,
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

        // M版月曆一次顯示7個月
        const calendarArray = [0, 1, 2, 3, 4, 5, 6].map((v, i) => moment(calendarStart).add(i, 'months').format('YYYY-MM'));

        return (
            <div className="calendar">
                <div className="label_box">
                    <div className="selected_info">
                        <DateLabel
                            isStart
                            isActive={activeInput === 0}
                            title="最早出發日"
                            date={this.state.selectedStartDate}
                            onClick={() => { this.switchLabel(0) }}
                        />
                        <DateLabel
                            isActive={activeInput !== 0}
                            title="最晚出發日"
                            date={this.state.selectedEndDate}
                            onClick={() => { this.switchLabel(1) }}
                        />
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
};

export default CalendarM;