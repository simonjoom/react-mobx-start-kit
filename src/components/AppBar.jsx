import React from 'react';
import dispatch from '~/src/core/dispatch';
import cx from 'classnames';
import {observer} from "mobx-react";

import withStyles from 'isomorphic-style-loader/lib/withStyles';
// components
import MenuLinksSX from './MenuLinksSX';
import MenuLinksDX from './MenuLinksDX';

// styles
import styles from '../styles/app.bar.css';

// events
const handleNavToggle = (e) => {
    e.preventDefault();
    dispatch('ui.appNav.open');
};

function AppBar({authCheck, user, accountMenuIsOpen, layoutIsShifted, s}) {
    const button = cx(s.btn, s['inline-block'], s.py2, s.m0);
    const appBar = cx(s.clearfix, s.right, s.animated, s.fadeIn);
    return (
        <div className={cx(styles.bar, appBar, {
    [styles.leftShifted]: layoutIsShifted,
    'left-0': !layoutIsShifted,
  })}
        >
            <div className={cx(s['left'],s['lg-hide'])}>
                <a onClick={handleNavToggle} className={button}>
                    <i className="fa fa-bars"/>
                </a>
                <MenuLinksSX inline styles/>
            </div>
            <div className={cx(s['left'],s['lg-show'])}>
                <a onClick={handleNavToggle} className={button}>
                    <i className="fa fa-bars fa-2x"/>
                </a>
                <MenuLinksSX styles/>
            </div>
            <div className="right md-show">
                <div className="inline-block">
                    <div className="relative">
                        <MenuLinksDX inline
                                     user={user}
                                     authCheck={authCheck}
                                     accountMenuIsOpen={accountMenuIsOpen}
                                     s={s}
                        />
                    </div>
                </div>
            </div>
            <div className={cx(s['clearfix'], s['sm-hide'])}></div>
            <div className={cx(s['overflow-hidden'], s['px2'])}>
            </div>
        </div>
    );
}

AppBar.propTypes = {
    user: React.PropTypes.object,
    authCheck: React.PropTypes.bool,
    layoutIsShifted: React.PropTypes.bool,
    accountMenuIsOpen: React.PropTypes.bool,
    s: React.PropTypes.object
};

export default withStyles(styles)(AppBar);
