import { create, getAll, getById, remove } from "./tasks.repository.js";

export const getAllTasks = () => {
  return getAll();
};

export const getTaskById = (id) => {
  const task = getById(id);
  if (!task) throw new Error("La tarea no encontrada");
  return task;
};

export const createTask = (data) => {
  if (
    !data.title ||
    typeof data.title !== "string" ||
    data.title.trim() === ""
  ) {
    throw new Error(
      "El título es requerido y debe ser una cadena de texto no vacía",
    );
  }

  return create(data.title);
};

export const updateTask = (id, data) => {
  const task = getById(id);
  if (!task) throw new Error("La tarea no encontrada");

  if (
    !data.title ||
    typeof data.title !== "string" ||
    data.title.trim() === ""
  ) {
    throw new Error(
      "El título es requerido y debe ser una cadena de texto no vacía",
    );
  }

  return update(task, { title: data.title.trim() });
};

export const deleteTask = (id) => {
  const task = getById(id);
  if (!task) throw new Error("La tarea no encontrada");
  remove(task);
};
