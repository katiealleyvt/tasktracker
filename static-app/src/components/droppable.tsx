import React from 'react';
import {useDroppable} from '@dnd-kit/core';

type DroppableProps = {
    id: string,
    children?: React.ReactNode
}
export function Droppable({id,children}:DroppableProps) {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });
  const style = {
    backgroundColor: isOver ? 'green' : "white",
    width: "200px",
    height: "50px"
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}