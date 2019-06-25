import React, { Fragment } from 'react';
import classNames from 'classnames';
import { connect } from "react-redux";


class ToolTip extends React.Component {

  render() {
    const { display, children } = this.props;
    return (
      <div className='pr ml-10 tootTip-container'>
        <div className={classNames({
          'triangle-top': display === 'top',
          'triangle-bottom': display === 'bottom',
        })}></div>
        <div className={classNames({
          'triangle-inner-top': display === 'top',
          'triangle-inner-bottom': display === 'bottom',
        })}></div>
        <div className='toolTip-body br-10'>
          {children}
        </div>
      </div>

    );

  }
}

ToolTip.defaultProps = {
  display: 'top'
}

const mapStateToProps = ({ }) => {
}

export default connect(
  mapStateToProps,
  {

  }
)(ToolTip)