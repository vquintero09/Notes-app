const tasks = [
  {
    id: 1,
    title: "Estudiar Node",
  },
];

export const getAll = () => {
  return tasks;
};

export const getById = (id) => {
  return tasks.find((task) => task.id === id);
};

export const create = (title) => {
  const newTask = {
    id: tasks.length + 1,
    title: title,
  };

  tasks.push(newTask);

  return newTask;
};

export const update = (task, data) => {
  const index = tasks.indexOf(task);

  const updateTask = {
    ...task,
    ...data,
  };

  tasks[index] = updateTask;

  return updateTask;
};

export function remove(task) {
  const index = tasks.indexOf(task);

  tasks.splice(index, 1);
}
