import { gql } from 'apollo-server-express';

export default gql `
    extend type Query {
        getAllTasks: [Task!]
    },

    extend type Mutation {
        createNewTask( newTask: TaskInput! ): Task! 
        editTaskByID ( id: ID!, updatedTask: TaskInput! ) : Task!
        deleteTaskByID (id: ID!) : TaskNotification!
    }

    input TaskInput {
        name: String!
    }

    type Task {
        id: ID!
        name: String!
    }

    type TaskNotification {
        code: String!
        success: Boolean!
        message: String!
    }
`
