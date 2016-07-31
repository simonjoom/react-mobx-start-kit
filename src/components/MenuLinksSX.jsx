import dispatch from '~/src/core/dispatch';
import cx from 'classnames';
import Link from './Link';
import Navigation from './Navigation';


function MenuLinksSX(inline, s) {
    const btnBlock = cx(s.btn, s.block, s.py2, s.m0);
    const btnInline = cx(s.btn, s['inline-block'], s.py2, s.m0);
    return (
        <span>
  <Navigation className={inline ? btnInline : btnBlock}/>
  </span>
    );
}

MenuLinksSX.propTypes = {
    inline: React.PropTypes.bool,
    s: React.PropTypes.object
};

export default MenuLinksSX;
