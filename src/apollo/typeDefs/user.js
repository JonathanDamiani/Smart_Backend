import { gql } from 'apollo-server-express';

export default gql `
    extend type Query {
        authenticateUserInfo: User! @isAuth
        authenticateUser(email: String!, password: String!): AuthResponse!
    }

    extend type Mutation {
        registerUser(newUser: UserInput!) : AuthResponse!
    }

    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    type User {
        id: ID!
        username: String!
        email: String!
    }

    type AuthResponse {
        response: BaseResponse!
        user: User!
        token: String!
    }
`
