import { handleError } from "../errors/handleError.js";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "./tasksService.js";

export const getAllTasksController = (req, res) => {
  const tasks = getAllTasks();
  res.statusCode = 200;
  res.end(JSON.stringify(tasks));
};

export const getTaskByIdController = (req, res) => {
  const parts = req.url.split("/");
  const id = parts[2];

  try {
    const task = getTaskById(id);
    res.statusCode = 200;
    res.end(JSON.stringify(task));
  } catch (error) {
    handleError(error, res);
  }
};

export const createTaskController = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    let data;

    try {
      data = JSON.parse(body);
      const newTask = createTask(data);
      res.statusCode = 201;
      res.end(JSON.stringify(newTask));
    } catch (error) {
      handleError(error, res);
    }
  });
};

export const updateTaskController = (req, res) => {
  const parts = req.url.split("/");
  const id = parts[2];

  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    let data;
    try {
      data = JSON.parse(body);
      const updatedTask = updateTask(id, data);
      res.statusCode = 200;
      res.end(JSON.stringify(updatedTask));
    } catch (error) {
      handleError(error, res);
    }
  });
};

export const deleteTaskController = (req, res) => {
  const parts = req.url.split("/");
  const id = parts[2];

  try {
    deleteTask(id);
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "Tarea eliminada exitosamente" }));
  } catch (error) {
    handleError(error, res);
  }
};
