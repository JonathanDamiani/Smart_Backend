export default {
    Query: {
        getAllTasks: async (_, {}, {Task} ) => {
            let results = await Task.find();
            return results;
        }
    },
    Mutation: {
        createNewTask: async (_, { newTask }, { Task }) => {
            let result = await Task.create(newTask)
            return result;
        },
        editTaskByID: async(_, { id, updatedTask }, { Task }) => {
            let result = await Task.findByIdAndUpdate(id, {...updatedTask}, { new: true });
            return result;
        },
        deleteTaskByID: async(_, {id}, {Task}) => {
            await Task.findByIdAndDelete(id);
            return {
                code:"200",
                success: true,
                message: "Task deleted!"
            }
        } 
    },
}