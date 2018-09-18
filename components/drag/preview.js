import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

class Drag extends Component {
    state = {
        pageX: 0,
    };
    render () {
        const style = {
            'position': 'absolute',
            'width': '100px',
            'height': '100px',
            'backgroundColor': 'red',
            'margin': '10px',
            'left': this.state.pageX,
            'top': 0,
        };
        return (
            <div>
                <div
                    style={style}
                    draggable={true}
                    onDragStart={e => {
                        console.log('drag start');
                    }}
                    onDrag={e => {
                        const x = e.clientX;
                        console.log('on drag', x);
                        if (x < 0) return;
                        this.setState(
                            prevStte => ({ pageX: x })
                        );
                    }}
                >
                    please drag me!
                </div>
            </div>
        );
    }
}

storiesOf('Component', module)
    .add('測試測試', () => (
        <Drag />
    ));
