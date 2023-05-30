import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "./List";
export default function Lists({ todoData, setTodoData }) {
  // const listStyle = (completed) => {
  //     return {
  //       padding: "10px",
  //       borderBottom: "1px #ccc dotted",
  //       textDecoration: completed ? "line-through" : "none",
  //     };
  //   };
  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
  };

  const handleCompleChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
  };

  const handleEnd = (result) => {
    //목적지가 없으면 (이벤트 취소) 이 함수를 종료합니다.
    if (!result.destination) return;
    const newTodoData = [...todoData];

    //1. 변경시키는 아이템을 배열에서 지워줍니다. 🔥🔥🔥🔥🔥
    //2. return값으로 지워진 아이템을 잡아줍니다.🔥🔥🔥
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    //원하는 자리에 reorderedItem을 insert해줌  result.destination.index -> 목적지
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
  };
  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="to-dos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      key ={data.id}
                      id = {data.id}
                      title = {data.title}
                      completed = {data.completed}
                      todoData = {todoData}
                      setTodoData = {setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                      handleCompleChange={handleCompleChange}
                      handleClick={handleClick}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
