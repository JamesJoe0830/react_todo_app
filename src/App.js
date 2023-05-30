import { toHaveStyle } from "@testing-library/jest-dom/matchers";
import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";

export default function App() {
  const [todoData, setTodoData] = useState([]);
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
      setValue("");
    } else {
      alert("빈칸을 입력하셨습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow md:w-3/4 md:max-w-lg lg:w-3/4 lg max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
        </div>

        <Lists todoData={todoData} setTodoData={setTodoData} />
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
