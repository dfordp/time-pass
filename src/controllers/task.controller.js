import { getTasks, getTaskById, createTask, deleteTaskById, updateTaskById,getTasksByUserId } from '../mongodb/models/task.js';

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await getTasks();
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await getTaskById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createNewTask = async (req, res) => {
  try {
    const { task, userId, isComplete } = req.body;
    const newTask = await createTask({ task, userId, isComplete : false });
    return res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await deleteTaskById(id);
    return res.json(deletedTask);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, userId, isComplete } = req.body;
    const updatedTask = await updateTaskById(id, { task, userId, isComplete });
    return res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};


export const getTasksByUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const tasks = await getTasksByUserId(userId);
      return res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };