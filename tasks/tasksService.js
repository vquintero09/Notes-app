import { AppError } from "../Errors/ApiError.js";
import { create, getAll, getById, remove, update } from "./tasks.repository.js";

export const getAllTasks = () => {
  return getAll();
};

export const getTaskById = (id) => {
  const task = getById(id);
  if (!task) throw new AppError("Tarea no encontrada", 404);
  return task;
};

export const createTask = (data) => {
  if (
    !data.title ||
    typeof data.title !== "string" ||
    data.title.trim() === ""
  ) {
    throw new AppError(
      "El título es requerido y debe ser una cadena de texto no vacía",
      400,
    );
  }

  return create(data.title);
};

// export const updateTask = (id, data) => {

//   const task = getById(id);
//   if (!task) throw new AppError("Tarea no encontrada", 404);

//   //comrobar que data sea un objeto valido y que no este vacio
//   if (typeof data !== "object" || Object.keys(data).length === 0) {
//     throw new AppError("Datos inválidos para actualizar la tarea", 400);
//   }

//   if (Object.keys(data).includes("id")) {
//     throw new AppError("No se puede actualizar el ID de la tarea", 400);
//   }

//   if (Object.hasOwn(data, "title")) {
//     if (typeof data.title !== "string" || data.title.trim() === "") {
//       throw new AppError(
//         "El título debe ser una cadena de texto no vacía",
//         400,
//       );
//     }

//     const newUpdateTask = { title: data.title.trim() };

//     return update(task, newUpdateTask);
//   }
// };

//Tu función debería seguir este orden:
//1. Comprobar que data sea un objeto válido, no null ni un array.
//2. Rechazar un objeto vacío.
//3. Comprobar que todas sus propiedades estén permitidas.
//4. Validar que title sea una cadena no vacía, si viene incluido.
//5. Actualizar la tarea y devolverla.

export const updateTask = (id, data) => {
  const task = getById(id);
  if (!task) throw new AppError("Tarea no encontrada", 404);

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    throw new AppError("Datos inválidos para actualizar la tarea", 400);
  }

  if (Object.keys(data).length === 0) {
    throw new AppError("Datos inválidos para actualizar la tarea", 400);
  }

  const allowedProperties = ["title"];
  const invalidProperties = Object.keys(data).filter(
    (key) => !allowedProperties.includes(key),
  );

  if (invalidProperties.length > 0) {
    throw new AppError("Propiedades inválidas para actualizar la tarea", 400);
  }

  if (Object.hasOwn(data, "title")) {
    if (typeof data.title !== "string" || data.title.trim() === "") {
      throw new AppError(
        "El título debe ser una cadena de texto no vacía",
        400,
      );
    }
  }

  const UpdateTask = { title: data.title?.trim() };

  return update(task, UpdateTask);
};

export const deleteTask = (id) => {
  const task = getById(id);
  if (!task) throw new AppError("Tarea no encontrada", 404);
  remove(task);
};
