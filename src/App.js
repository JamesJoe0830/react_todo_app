import { toHaveStyle } from "@testing-library/jest-dom/matchers";
import React, {useState} from "react";
import "./App.css";

export default function App() {
  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right", //오른쪽 정렬
  };

  const listStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };
  const [todoData,setTodoData] = useState([]);
  const [value, setValue] = useState('');
  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
  };

  const handleChange = (e) => {
  setValue(e.target.value);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔥 여기 오답할때 보자 [빈칸은 들어가면 안되니까 조건 걸어줌]
    if (value !== "") {
      let newTodo = {
        id: Date.now(),
        title: value,
        completed: false,
      };
      setTodoData(prev => [...prev, newTodo]);
      setValue("");
    } 
    else {
      alert('빈칸을 입력하셨습니다.')
    }
  };
  const handleCompleChange = (id) =>{
    let newTodoData = todoData.map((data)=> {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
  };


    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>
          {todoData.map((data) => (
            <div style={listStyle(data.completed)} key={data.id}>
              <input 
              type="checkbox" 
              onChange = {()=> handleCompleChange(data.id)} 
              defaultChecked={false} />
              {data.title}
              <button
                style={btnStyle}
                onClick={() => handleClick(data.id)}
              >
                x
              </button>
            </div>
          ))}

          <form style={{ display: "flex" }} onSubmit={handleSubmit}>
            <input
              type="text"
              name="value"
              style={{ flex: "10", padding: "5px" }}
              placeholder="해야 할 일을 입력하세요."
              value={value} // 입력된 값 들어오고
              onChange={handleChange} // 바뀌었을때
            />
            <input
              type="submit"
              value="입력"
              className="btn"
              style={{ flex: "1" }}
            />
          </form>
        </div>
      </div>
    );
  }
