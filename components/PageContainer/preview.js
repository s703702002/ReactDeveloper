import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import PageContainer from './pageContainer';
import { CalendarM } from '../Calendar';

class Demo extends Component {
    state = {
        show: false,
    };
    clickShow = () => {
        this.setState({ show: true });
    }
    render () {
        const {
            show,
        } = this.state;
        return (
            <div>
                <button onClick={this.clickShow}>show</button>
                <button>close</button>
                <PageContainer
                    show={show}
                    onClickClose={() => { this.setState({ show: false }) }}
                >
                    <CalendarM
                        doubleChoose
                        startLabelTitle="入住日期"
                        endLabelTitle="退房日期"
                    />
                    <button className="confirm_btn">確定</button>
                </PageContainer>
            </div>
        );
    }
}

storiesOf('Component', module)
    .add('分頁', () => (
        <Demo />
    ));