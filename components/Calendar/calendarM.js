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
}) => (
    <div className={cx({
        'start_section': isStart,
        'end_section': !isStart,
        active: isActive,
    })}>
        <h5 className="title">{title}</h5>
        <div className="date">8月4日</div>
    </div>
);
class CalendarM extends PureComponent {
    static defaultProps = {
        doubleChoose: false, // 選一天或選兩天
    };
    state = {
        calendarStart: this.props.selectedStartDate || moment().format('YYYY-MM'),
        selectedStartDate: this.props.selectedStartDate || '',
        selectedEndDate: this.props.selectedEndDate || '',
        activeInput: 0,
    };
    render () {
        const {
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
            activeInput,
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
            isMobile: true,
        };

        const startMonth = moment(calendarStart).format('YYYY-MM');
        const nextMonth = moment(calendarStart).add(1, 'months').format('YYYY-MM');

        return (
            <div className="calendar">
                <div className="label_box">
                    <div className="selected_info">
                        <DateLabel
                            isStart
                            isActive={activeInput === 0}
                            title="最早出發日"
                        />
                        <DateLabel
                            isActive={activeInput !== 0}
                            title="最晚出發日"
                        />
                    </div>
                    <Week />
                </div>
                <div className="calendar_content">
                    <CalendarBox
                        startMonth={startMonth}
                        {...props}
                    />
                    <CalendarBox
                        startMonth={nextMonth}
                        {...props}
                    />
                </div>
            </div>
        );
    }
}

CalendarM.propTypes = {
    onDateClick: Proptypes.func,
    startDate: Proptypes.string,
    doubleChoose: Proptypes.bool,
};

export default CalendarM;