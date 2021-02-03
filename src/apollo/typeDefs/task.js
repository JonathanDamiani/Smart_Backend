import { gql } from 'apollo-server-express';

export default gql `
    extend type Query {
        getAllTasks: [Task!] @isAuth
    },

    extend type Mutation {
        createNewTask( newTask: TaskInput! ): Task! @isAuth
        editTaskByID ( id: ID!, updatedTask: TaskInput! ) : Task! @isAuth
        deleteTaskByID (id: ID!) : TaskNotification! @isAuth
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
