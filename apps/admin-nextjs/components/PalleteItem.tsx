import React from 'react';
import { useDrag } from 'react-dnd';

export const PalleteItem = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: item,
    item: {
      id: item,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      style={{
        background: 'lightgray',
        margin: 20,
        padding: 10,
        opacity: isDragging ? 0.5 : 1,
      }}
      key={item}
      ref={drag}
    >
      {item}
    </div>
  );
};
