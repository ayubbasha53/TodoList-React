import React, { useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
  };

  const handleSaveTask = (index, updatedTask) => {
    if (updatedTask.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[index] = updatedTask;
      setTasks(updatedTasks);
      setEditIndex(-1);
    }
  };

  return (
    <div className="todo-list-container">
      <div className="input-container">
        <textarea id="task" value={newTask} onChange={handleChange} />
        <button id="btn" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className="list">
              {editIndex === index ? (
                <>
                  <td>
                    <textarea
                      className="editTask"
                      value={task}
                      onChange={(e) => handleSaveTask(index, e.target.value)}
                    />
                  </td>
                  <td>
                    <button
                      className="saveTask"
                      onClick={() => handleSaveTask(index, task)}
                    >
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{task}</td>
                  <td>
                    <button
                      className="edit"
                      onClick={() => handleEditTask(index)}
                    >
                      Edit
                    </button>
                  </td>
                </>
              )}
              <td>
                <button
                  className="delete"
                  onClick={() => handleDeleteTask(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
