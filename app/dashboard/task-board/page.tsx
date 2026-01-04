"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Status = "todo" | "progress" | "done";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  status: Status;
}

export default function TaskBoardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  /* ===== LOAD TASKS ===== */
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  /* ===== SAVE TASKS ===== */
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  /* ===== ADD TASK ===== */
  const addTask = () => {
    const newTask: Task = {
      id: uuidv4(),
      title: form.title,
      description: form.description,
      priority: form.priority as any,
      dueDate: form.dueDate,
      status: "todo",
    };

    setTasks([...tasks, newTask]);
    setForm({ title: "", description: "", priority: "Medium", dueDate: "" });
    setShowForm(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  /* ===== UPDATE STATUS ===== */
  const moveTask = (id: string, status: Status) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  };

  /* ===== DELETE ===== */
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filter = (status: Status) => tasks.filter(t => t.status === status);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* SUCCESS TOAST */}
      {success && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow">
          ✔ Task added successfully!
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Task Board</h1>
          <p className="text-gray-600">Manage your tasks and workflow</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          + Add Task
        </button>
      </div>

      {/* BOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Column title="To Do" count={filter("todo").length} color="blue">
          {filter("todo").map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onMove={moveTask}
            />
          ))}
        </Column>

        <Column title="In Progress" count={filter("progress").length} color="yellow">
          {filter("progress").map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onMove={moveTask}
            />
          ))}
        </Column>

        <Column title="Done" count={filter("done").length} color="green">
          {filter("done").map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onMove={moveTask}
            />
          ))}
        </Column>
      </div>

      {/* ADD TASK MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Task</h2>

            <input
              placeholder="Task title"
              className="w-full border p-2 rounded mb-3"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              placeholder="Description"
              className="w-full border p-2 rounded mb-3"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />

            <select
              className="w-full border p-2 rounded mb-3"
              value={form.priority}
              onChange={e => setForm({ ...form, priority: e.target.value })}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <input
              type="date"
              className="w-full border p-2 rounded mb-4"
              value={form.dueDate}
              onChange={e => setForm({ ...form, dueDate: e.target.value })}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Column({ title, count, color, children }: any) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-semibold mb-4 flex justify-between">
        <span>{title}</span>
        <span className={`px-3 py-1 rounded-full text-sm bg-${color}-100`}>
          {count}
        </span>
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function TaskCard({ task, onDelete, onMove }: any) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm relative">
      <button
        onClick={() => onDelete(task.id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
      >
        🗑
      </button>

      <h4 className="font-semibold">{task.title}</h4>
      <p className="text-sm text-gray-600 mb-2">{task.description}</p>

      <div className="flex gap-2 items-center text-sm">
        <span className={`px-2 py-1 rounded bg-red-100 text-red-700`}>
          {task.priority}
        </span>
        <span className="text-gray-500">Due: {task.dueDate}</span>
      </div>

      <div className="flex gap-2 mt-3">
        {task.status !== "todo" && (
          <button onClick={() => onMove(task.id, "todo")} className="text-xs text-blue-600">
            To Do
          </button>
        )}
        {task.status !== "progress" && (
          <button onClick={() => onMove(task.id, "progress")} className="text-xs text-yellow-600">
            Progress
          </button>
        )}
        {task.status !== "done" && (
          <button onClick={() => onMove(task.id, "done")} className="text-xs text-green-600">
            Done
          </button>
        )}
      </div>
    </div>
  );
}
