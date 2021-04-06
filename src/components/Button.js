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
    disabled
}) => {
    return (
        <button
            className={classNames('Button', size, color, {
                outline,
                fullWidth,
                halfWidth,
            })}
            onClick={onClick}
            disabled={disabled}
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
