import React from "react";

export default function List({
    id, title, completed, todoData, setTodoData, provided, snapshot, handleClick, handleCompleChange}) {
  return (
    <div>
      <div
        key={id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className={`${
          snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
        } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
      >
        <div className="items-center">
          <input
            type="checkbox"
            onChange={() => handleCompleChange(id)}
            defaultChecked={completed}
          />
          <span className={completed ? "line-through" : undefined}>
            {title}
          </span>
        </div>
        <div className="items-center">
          <button
            className="px-4 py-2 float-right"
            onClick={() => handleClick(id)}
          >  
            x
          </button>
        </div>
      </div>
    </div>
  );
}

