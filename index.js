import http from "node:http";
import {
  createTask,
  getAllTasks,
  updateTask,
  getTaskById,
  deleteTask,
} from "./tasks/tasksService.js";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/tasks") {
    const tasks = getAllTasks();
    res.statusCode = 200;
    res.end(JSON.stringify(tasks));
    return;
  }

  if (req.method === "POST" && req.url === "/tasks") {
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
        res.statusCode = 400;
        res.end(JSON.stringify({ message: error.message }));
      }
    });
    return;
  }

  if (req.method === "GET" && req.url.startsWith("/tasks/")) {
    const parts = req.url.split("/");
    const id = Number(parts[2]);

    try {
      const task = getTaskById(id);
      res.statusCode = 200;
      res.end(JSON.stringify(task));
    } catch (error) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: error.message }));
    }

    return;
  }

  if (req.method === "DELETE" && req.url.startsWith("/tasks/")) {
    const parts = req.url.split("/");
    const id = Number(parts[2]);

    try {
      deleteTask(id);
      res.statusCode = 204;
      res.end();
    } catch (error) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: error.message }));
    }
  }

  if (req.method === "PATCH" && req.url.startsWith("/tasks/")) {
    const parts = req.url.split("/");
    const id = Number(parts[2]);

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const updatedTask = updateTask(id, data);
        res.statusCode = 200;
        res.end(JSON.stringify(updatedTask));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: error.message }));
      }
    });
    return;
  }

  //rutas no encontradas (404)
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Ruta no encontrada" }));
});

server.listen(3001, () => {
  console.log("Server Listening on port: http://localhost:3001");
});
