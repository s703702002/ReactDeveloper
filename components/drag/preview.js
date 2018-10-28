import React, { Component, PureComponent, memo } from 'react';
import { storiesOf } from '@storybook/react';

class Counter extends PureComponent {
    render () {
        console.log('Counter render');
        const {
            onClickP,
            onClickN,
            count,
        } = this.props;
        return (
            <div>
                <button onClick={onClickP}>
                -
                </button>
                <span>
                    {count}
                </span>
                <button onClick={onClickN}>
                +
                </button>
            </div>
        );
    }
}

class Drag extends Component {
    state = {
        count: 1,
        countLength: [0],
    };
    onSelect = (e) => {
        let val = e.target.value;
        val = Number(val);
        const arr = [];
        for (let i = 0; i < val; i++) {
            arr.push(0);
        }
        this.setState({
            countLength: arr,
            count: 0,
        });
    }
    add = () => {
        const count = this.state.count;
        this.setState({
            count: count + 1
        });
    }
    minus = () => {
        const count = this.state.count;
        this.setState({
            count: count - 1
        });
    }
    render () {
        console.log('Drag render');
        const arr = this.state.countLength;
        const count = this.state.count;
        return (
            <div>
                <select name="" id="" onChange={this.onSelect}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                {
                    arr.map((v, i) => (
                        <Counter
                            key={i}
                            count={count}
                            onClickP={this.minus}
                            onClickN={this.add}
                        />
                    ))
                }
                <button onClick={() => {
                    this.setState({
                        count: 0
                    });
                }}>歸零</button>
            </div>
        );
    }
}

const Item = memo(({ num }) => {
    console.log('ITEM render');
    return (
        <span>
            {num}
        </span>
    );
});

class TestMemo extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            list: [1, 2, 3, 4, 5]
        };
    }
    handleAdd = () => {
        this.setState(prevState => ({
            list: prevState.list.concat([prevState.list.length + 1]),
        }));
    }
    render () {
        const list = this.state.list;
        return (
            <div>
                <h3>測試memo</h3>
                {
                    list.map(v => <Item key={v} num={v} />)
                }
                <button onClick={this.handleAdd}>click me for add list</button>
            </div>
        );
    }
}

storiesOf('Component', module)
    .add('測試測試', () => (
        <div>
            <Drag />
            <TestMemo />
        </div>
    ));
