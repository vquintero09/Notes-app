import { AppError } from "../Errors/ApiError.js";
import { create, getAll, getById, remove, update } from "./tasks.repository.js";
import { validateTaskDataSchema, validateUpdateTask } from "./task.schema.js";

export const getAllTasks = () => {
  return getAll();
};

export const getTaskById = (id) => {
  const task = getById(id);
  if (!task) throw new AppError("Tarea no encontrada", 404);
  return task;
};

export const createTask = (data) => {
  const resultValidatedData = validateTaskDataSchema(data);
  return create(resultValidatedData.title);
};

export const updateTask = (id, data) => {
  const task = getById(id);
  if (!task) throw new AppError("Tarea no encontrada", 404);

  const resultValidateData = validateUpdateTask(data);

  if (!resultValidateData.success) {
    throw new AppError(
      resultValidateData.error.issues.map((issue) => issue.message),
      400,
    );
  }

  const updatedData = resultValidateData.data;

  return update(task, updatedData);
};

export const deleteTask = (id) => {
  const task = getById(id);
  if (!task) throw new AppError("Tarea no encontrada", 404);
  remove(task);
};
