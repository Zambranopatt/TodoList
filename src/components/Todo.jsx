import { useState, useRef, useEffect } from "react";

const Todo = () => {
  const inputFormat = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState(["Maglaba", "Maghugas"]);
  const addTask = () => {
    if (input.trim() === "") {
      alert(`Invalid`);
      return;
    }
    setTasks([inputFormat(input), ...tasks]);
    setInput("");
  };

  const inputRef = useRef(null);
  const deleteTask = (index) => {
    const filteredTask = tasks.filter((_, i) => i !== index);
    setTasks(filteredTask);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const searchFilter = tasks.filter((el) => el.includes(inputFormat(search)));

  return (
    <div className="space-y-2 p-3 bg-gray-100 rounded-xl shadow-md">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold tracking-wide">Todo</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-30 text-center"
          placeholder="Search Task"
        />
      </div>
      <div>
        <input
          ref={inputRef}
          type="text"
          value={input}
          placeholder="Add Task"
          className="py-1 px-1"
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btns bg-black hover:bg-gray-900" onClick={addTask}>
          Add Task
        </button>
      </div>
      <div className="space-y-1">
        {searchFilter.length > 0 ? (
          searchFilter.map((el, i) => (
            <div key={i} className="flex justify-between">
              <p>
                {i + 1}. {el}
              </p>
              <button
                onClick={() => deleteTask(i)}
                className="btns bg-red-500 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>Task Empty</p>
        )}
      </div>
    </div>
  );
};

export default Todo;
