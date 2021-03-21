import React from 'react';
import '../resources/css/Button.scss';
import classNames from 'classnames';

const Button = ({
    children,
    size,
    color,
    outline,
    fullWidth,
    halfWidth,
    onClick,
}) => {
    return (
        <button
            className={classNames('Button', size, color, {
                outline,
                fullWidth,
                halfWidth,
            })}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

Button.defaultProps = {
    size: 'medium',
    color: 'blue',
};

export default Button;
