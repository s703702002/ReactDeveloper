import React, { Component, PureComponent } from 'react';
import cx from 'classnames';
import Proptypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './page_container.scss';

function FirstChild (props) {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
}

class PageContent extends Component {
    static propTypes = {
        onClickClose: Proptypes.func,
    };
    componentDidMount () {
        console.log('componentDidMount');
    }
    componentWillUnmount () {
        console.log('componentWillUnmount');
    }
    render () {
        const {
            children,
            onClickClose
        } = this.props;
        return (
            <div className="page_container">
                <span className="close" onClick={onClickClose} />
                {children}
            </div>
        );
    }
}

const PageContainer = ({
    show,
    onClickClose = () => {},
    children,
}) => (
    <ReactCSSTransitionGroup
        transitionName="show"
        transitionEnterTimeout={300}
        transitionEnter={true}
        transitionLeave={true}
        transitionLeaveTimeout={300}
        component={FirstChild}
    >
        {
            show ?
                <PageContent onClickClose={onClickClose} key="pageContent">{children}</PageContent> :
                null
        }
    </ReactCSSTransitionGroup>
);

export default PageContainer;