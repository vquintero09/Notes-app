import http from "node:http";
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
} from "./tasks/tasksController.js";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/tasks") {
    return getAllTasksController(req, res);
  }

  if (req.method === "POST" && req.url === "/tasks") {
    return createTaskController(req, res);
  }

  if (req.method === "GET" && req.url.startsWith("/tasks/")) {
    return getTaskByIdController(req, res);
  }

  if (req.method === "DELETE" && req.url.startsWith("/tasks/")) {
    return deleteTaskController(req, res);
  }

  if (req.method === "PATCH" && req.url.startsWith("/tasks/")) {
    return updateTaskController(req, res);
  }

  //rutas no encontradas (404)
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Ruta no encontrada" }));
});

server.listen(3001, () => {
  console.log("Server Listening on port: http://localhost:3001");
});
