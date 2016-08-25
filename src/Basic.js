import React, { PropTypes } from 'react';
import { isBlocked, block } from './clock';

import {
  BACK,
  DOWN,
  UP,
  MENU,
  NEXTPROG,
  PREVPROG,
  NUM0,
  NUM1,
  NUM2,
  NUM3,
  NUM4,
  NUM5,
  NUM6,
  NUM7,
  NUM8,
  NUM9,
 } from './keys';
import { execCb } from './funcHandler';

const Keys = React.createClass({

  propTypes: {
    onBack: PropTypes.func,
    onDown: PropTypes.func,
    onUp: PropTypes.func,
    onDigit: PropTypes.func,
    onMenu: PropTypes.func,
    onNextProg: PropTypes.func,
    onPrevProg: PropTypes.func,
    active: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      active: true,
    };
  },

  componentDidMount() {
    this.callback = ({ keyCode }) => {
      if (this.props.active && !isBlocked()) {
        switch (keyCode) {
          case BACK:
            if (this.props.onBack) {
              block();
              execCb(this.props.onBack, null, this, this.props);
            }
            break;
          case UP:
            if (this.props.onUp) {
              block();
              execCb(this.props.onUp, null, this, this.props);
            }
            break;
          case DOWN:
            if (this.props.onDown) {
              block();
              execCb(this.props.onDown, null, this, this.props);
            }
            break;
          case MENU:
            if (this.props.onMenu) {
              block();
              execCb(this.props.onMenu, null, this, this.props);
            }
            break;
          case NEXTPROG:
            if (this.props.onNextProg) {
              block();
              execCb(this.props.onNextProg, null, this, this.props);
            }
            break;
          case PREVPROG:
            if (this.props.onPrevProg) {
              block();
              execCb(this.props.onPrevProg, null, this, this.props);
            }
            break;
          case NUM0:
          case NUM1:
          case NUM2:
          case NUM3:
          case NUM4:
          case NUM5:
          case NUM6:
          case NUM7:
          case NUM8:
          case NUM9:
            if (this.props.onDigit) {
              block();
              execCb(this.props.onDigit, keyCode, this, this.props);
            }
            break;
          default:
        }
      }
    };
    window.document.addEventListener('keydown', this.callback);
  },

  componentWillUnmount() {
    window.document.removeEventListener('keydown', this.callback);
  },

  render() {
    return <div id="hoc-keys">{this.props.children}</div>;
  },

});

export default Keys;
