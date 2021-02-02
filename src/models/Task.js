import { model, Schema } from 'mongoose';

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
})

const Task = model('Task', TaskSchema);

export default Task;