import React from 'react';
import classnames from 'classnames';

type Props = {
  title: string;
  variant: 'red' | 'yellow' | 'green' | 'pink';
};

const EmptyCard: React.FC<Props> = ({ title, variant }) => {
  const className = classnames(
    'bg-red-500 text-white h-24 w-full flex justify-center items-center text-2xl',
    {
      'bg-red-500': variant === 'red',
      'bg-yellow-500': variant === 'yellow',
      'bg-green-500': variant === 'green',
      'bg-pink-500': variant === 'pink',
    }
  );
  return <div className={className}>{title}</div>;
};

export default EmptyCard;
