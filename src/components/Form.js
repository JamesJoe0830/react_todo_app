import React from "react";

export default function ({ value, setValue, handleSubmit }) {
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex pt-2">
        <input
          type="text"
          name="value"
          className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
          style={{ flex: "10", padding: "5px" }}
          placeholder="해야 할 일을 입력하세요."
          value={value} // 입력된 값 들어오고
          onChange={handleChange} // 바뀌었을때
        />
        <input
          type="submit"
          value="입력"
          className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
        />
      </form>
    </div>
  );
};
