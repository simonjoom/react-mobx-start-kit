import React, {PropTypes} from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Linkmaterial';

function Navigation({className}) {
    return (
        <div className={cx(s.root)} role="navigation">
            <Link className={cx(s.link)} to="/about" hoverColor="#8AA62F" icon={<i className="mb3 fa fa-diamond" />}>About</Link>
            <Link className={cx(s.link,className)} to="/contact">Contact</Link>
            <Link className={cx(s.link,className)} to="/root">Root</Link>
            <span className={cx(s.spacer,className)}> | </span>
            <Link className={cx(s.link,className)} to="/login">Log in</Link>
            <span className={cx(s.spacer,className)}>or</span>
            <Link className={cx(s.link, s.highlight,className)} to="/register">Sign up</Link>
        </div>
    );
}

Navigation.propTypes = {
    className: PropTypes.string,
};

export default withStyles(s)(Navigation);
