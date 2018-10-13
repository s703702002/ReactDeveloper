import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import PageContainer from './pageContainer';

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
                    className="custom_class"
                >
                    <h2>我是一個分頁Component</h2>
                    <p>props:</p>
                    <p>className: string</p>
                    <p>onClickClose: func</p>
                    <p>show: bool (控制分頁是否出現)</p>
                    <p>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</p>
                    <p>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</p>
                    <p>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</p>
                    <p>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</p>
                    <p>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</p>
                    <p>內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容</p>
                </PageContainer>
            </div>
        );
    }
}

storiesOf('Component', module)
    .add('分頁', () => (
        <Demo />
    ));