import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "El titulo es obligatorio"),
});

export const updateTaskSchema = createTaskSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un campo para actualizar",
  });

export const validateTaskDataSchema = (data) => {
  return createTaskSchema.parse(data);
};

export const validateUpdateTask = (data) => {
  return updateTaskSchema.safeParse(data);
};
