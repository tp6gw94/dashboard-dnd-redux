import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import classnames from 'classnames';

type Props = {
  id: string;
};

const Droppable: React.FC<Props> = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={classnames('border w-full h-80 overflow-auto', {
        'border-blue-400': isOver,
      })}
      style={{ minHeight: '500px' }}
    >
      {children}
    </div>
  );
};

export default Droppable;
