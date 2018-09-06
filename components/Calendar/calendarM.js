import React, { Component, PureComponent } from 'react';
import cx from 'classnames';
import Proptypes from 'prop-types';
import moment from 'moment';
import CalendarBox, { Week } from './CalendarBox';
import './calendar.scss';

class CalendarM extends PureComponent {
    static defaultProps = {
        doubleChoose: false, // 選一天或選兩天
    };
    state = {
        calendarStart: this.props.selectedStartDate || moment().format('YYYY-MM'),
        isMinMonth: false,
        isMaxMonth: false,
        hoverDate: null,
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
            hoverDate,
        } = this.state;

        const props = {
            minDay: startDate,
            maxDay: endDate,
            onDateClick,
            selectedStartDate,
            selectedEndDate,
            startTxt,
            endTxt,
            doubleChoose,
            hoverDate,
            isMobile: true,
        };

        const start = calendarStart.split('-');
        const next = moment([start[0], start[1] - 1]).add(1, 'months');

        return (
            <div className="calendar">
                <div className="label_box">
                    <div className="selected_info">
                        <div className="start_section">
                            <h5 className="title">最早出發日</h5>
                            <div className="startDay">8月4日</div>
                        </div>
                        <div className="end_section">
                            <h5 className="title">最晚出發日</h5>
                            <div className="endDay">8月15日</div>
                        </div>
                    </div>
                    <Week />
                </div>
                <div className="calendar_content">
                    <CalendarBox
                        year={start[0]}
                        month={start[1]}
                        {...props}
                    />
                    <CalendarBox
                        year={next.format('YYYY')}
                        month={next.format('MM')}
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