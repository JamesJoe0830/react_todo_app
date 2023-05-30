import React, { useState, useCallback } from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";

const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];
export default function App() {
  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔥 여기 오답할때 보자 [빈칸은 들어가면 안되니까 조건 걸어줌]
    if (value !== "") {
      let newTodo = {
        id: Date.now(),
        title: value,
        completed: false,
      };
      setTodoData((prev) => [...prev, newTodo]);
      localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
      setValue("");
    } else {
      alert("빈칸을 입력하셨습니다.");
    }
  };

  // 🔥 useCallback으로 todoData가 바뀔때만 함수가 렌더링 되게하고 부모부터 자식까지 렌더링이 되게 만듦
  const handleClick = useCallback((id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  }, [todoData]);
  const handleRemoveClick = () =>{
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));
  };
  
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow md:w-3/4 md:max-w-lg lg:w-3/4 lg max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>

        <Lists handleClick ={handleClick} todoData={todoData} setTodoData={setTodoData} />
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
