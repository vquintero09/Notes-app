import { ZodError } from "zod";
export const handleError = (error, res) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal Server Error";

  if (error instanceof ZodError) {
    statusCode = 400;
    message = error.issues.map((issue) => issue.message);
  }

  res.statusCode = statusCode;
  res.end(JSON.stringify({ message }));
};
