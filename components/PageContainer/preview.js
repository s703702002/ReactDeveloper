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
                <PageContainer
                    show={show}
                    onClickClose={() => { this.setState({ show: false }) }}
                >
                    <p>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</p><p>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</p><p>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</p><p>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</p><p>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</p><p>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</p><p>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</p><p>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</p><p>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</p><p>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</p>
                </PageContainer>
            </div>
        );
    }
}

storiesOf('Component', module)
    .add('分頁', () => (
        <Demo />
    ));