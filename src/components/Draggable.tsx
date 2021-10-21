import React from 'react';
import { useDraggable } from '@dnd-kit/core';

type Props = {
  id: string;
  name?: string;
  data?: Record<string, any>;
  close?: boolean;
  onClose?: () => void;
};

const Draggable: React.FC<Props> = ({
  name,
  id,
  children,
  data,
  close,
  onClose,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div className="w-full h-full" ref={setNodeRef} style={style}>
      <div className="p-4 flex justify-between bg-blue-300 space-x-6">
        <h4 className="text-lg text-gray-600">{name}</h4>
        <div className="flex items-center space-x-6">
          {close ? (
            <button onClick={onClose} className="text-black">
              <i className="gg-close-o" />
            </button>
          ) : (
            <button
              className="cursor-move text-black"
              {...listeners}
              {...attributes}
            >
              <i className="gg-controller" />
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Draggable;
