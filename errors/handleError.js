export const handleError = (error, res) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  res.statusCode = statusCode;
  res.end(JSON.stringify({ message }));
};
