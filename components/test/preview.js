import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Transition } from 'react-transition-group';
import './css.scss';

class Item extends Component {
    componentDidMount () {
        const { name } = this.props;
        console.log(name, 'DidMount');
    }
    componentWillUnmount () {
        const { name } = this.props;
        console.log(name, 'UnMount');
    }
    render () {
        const { name, onClick } = this.props;
        return (
            <li onClick={onClick}>{name}</li>
        );
    }
}

class Demo extends Component {
    state = {
        list: ['andy', 'david']
    };
    input = null;
    removeItem = (i) => {
        this.setState(prevState => {
            const { list } = prevState;
            list.splice(i, 1);
            return { list };
        });
    }
    render () {
        const { list } = this.state;
        console.log('list lenght', list.length);
        return (
            <div>
                <input type="text" ref={e => { this.input = e }} />
                <button onClick={() => {
                    const name = this.input.value;
                    this.setState(prevState => ({ list: [...prevState.list, name] }), function () {
                        this.input.value = '';
                    });
                }}>add member</button>
                <ReactCSSTransitionGroup
                    transitionName="test"
                    transitionEnterTimeout={1000}
                    transitionEnter={true}
                    transitionLeave={true}
                    transitionLeaveTimeout={1000}
                    component="ul"
                >
                    {
                        list.lenght > 5 ?
                            <Transition timeout={500}>
                                <div>hello world</div>
                            </Transition> :
                            null
                    }
                    {
                        list.map((v, i) => <Item name={v} key={v} onClick={() => { this.removeItem(i) }} />)
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

storiesOf('Component', module)
    .add('測試', () => (
        <Demo />
    ));
