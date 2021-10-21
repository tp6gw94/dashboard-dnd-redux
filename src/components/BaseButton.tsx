import React from 'react';
import classnames from 'classnames';

type Props = {
  variant: 'primary' | 'secondary';
  className?: string;
  [key: string]: any;
};

const BaseButton: React.FC<Props> = ({
  variant,
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classnames(
        {
          'bg-blue-400': variant === 'primary',
          'bg-green-400': variant === 'secondary',
        },
        'rounded px-4 py-2 text-white',
        className
      )}
    >
      {children}
    </button>
  );
};

export default BaseButton;
