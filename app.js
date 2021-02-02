import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './src/apollo';
import { success, error } from 'consola';
import mongoose from 'mongoose';
import { PORT, MODE, DB_URI } from './src/config/';
import * as ServerModels from './src/models';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: MODE === 'dev',
    context: {
        ...ServerModels
    }
})

const app = express();

const StartServer = async () => {
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        success({
            badge: true,
            message: `Successfuly connected to db`
        });
    
        // Connect Apollo to express
        server.applyMiddleware({app});
        app.listen(PORT, () => {
            success({
                badge: true,
                message: `🚀 Server ready at ${PORT}`,
            })
        })    
    }
    catch (err) {
        error ({
            badge: true,
            message: err.message
        });
    }
};

StartServer();