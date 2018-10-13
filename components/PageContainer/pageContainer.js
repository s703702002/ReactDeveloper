import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
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
        className: Proptypes.string,
    };
    componentDidMount () {
        console.log('Page Content DidMount');
    }
    componentWillUnmount () {
        console.log('Page Content WillUnmount');
    }
    render () {
        const {
            children,
            onClickClose,
            className,
        } = this.props;
        return (
            <div className={cx('page_container', className)}>
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
    className,
}) => ReactDOM.createPortal(
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
                <PageContent onClickClose={onClickClose} key="pageContent" className={className}>
                    {children}
                </PageContent> :
                null
        }
    </ReactCSSTransitionGroup>,
    document.body
);

export default PageContainer;