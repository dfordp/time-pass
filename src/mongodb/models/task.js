import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    task : {type : String , required : true},
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isComplete : {
      type : Boolean,
      default : false,
      required : true,
    }
});

const Task =mongoose.model("Task",taskSchema);


export const getTasks = () => Task.find();
export const getTaskById = (id) => Task.findById(id);
export const createTask = (values) => {
  console.log('Creating task with values:', values);
  return new Task(values).save()
    .then((task) => task.toObject())
    .catch((error) => {
      console.error('Error creating task:', error);
      throw error;
    });
};
export const deleteTaskById = (id) => Task.findOneAndDelete({ _id: id });
export const updateTaskById = (id, values) => Task.findByIdAndUpdate(id, values);
export const getTasksByUserId = (userId) => Task.find({ userId });