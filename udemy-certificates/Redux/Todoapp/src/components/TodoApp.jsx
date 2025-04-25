import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  removeTask,
  completedTask,
  fetchTasks,
} from "../redux/actions/action";

const TodoApp = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    if (taskInput.trim()) {
      dispatch(addTask(taskInput));
      setTaskInput("");
    }
  };

  return (
    <div>
      <h2>Todo App</h2>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add a new task"
        className="inputstyle"
      />
      <button onClick={handleAddTask} className="btnstyle">
        Add Task
      </button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {" "}
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>
            <button
              onClick={() => dispatch(completedTask(task.id))}
              className="btnstyleRemove"
            >
              Complete
            </button>
            <button
              onClick={() => dispatch(removeTask(task.id))}
              className="btnstyleRemove"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
