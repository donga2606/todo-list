import { Task } from "@/types/entities";
import { create } from "zustand";

interface TaskStore {
  tasks: Task[];
  addTask: (newTask: Task) => void;
  updateTask: (id: string, updatedTask: Task) => void;
  deleteTask: (id: string) => void;
  retrieveTasks: () => void;
}

export const useStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (newTask: Task) =>
    set((state) => ({ tasks: [...state.tasks, newTask] })),
  deleteTask: (id: string) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
  updateTask: (id: string, updatedTask: Task) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === id) {
          return updatedTask;
        }
        return task;
      });
      return { tasks: updatedTasks };
    }),
  retrieveTasks: () =>
    set((state) => {
      const data = localStorage.getItem("tasks");
      if (data) {
        const parsedData = JSON.parse(data);
        const tasks = parsedData.map((task: Task) => {
          task.dueDate && (task.dueDate = new Date(task.dueDate));
          return task;
        });
        return { tasks: tasks };
      }
      return { tasks: state.tasks };
    }),
}));
