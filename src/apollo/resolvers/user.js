import { ApolloError } from 'apollo-server-express';
import { hash, compare } from 'bcryptjs';
import { createToken, serializeUser } from '../../helpers';

export default {
    Query: {
        authenticateUserInfo: async (_ ,args, { user }) => user,

        authenticateUser: async (_, {email, password}, { User }) => {
            try {
                let user = await User.findOne({ email });

                if (!user) {
                    throw new Error("User doesn't exist ");
                }

                let isPasswordCorrect =  await compare(password, user.password);

                if (!isPasswordCorrect) {
                    throw new Error("Password incorrect");
                }

                user = user.toObject();
                user.id = user._id;
                user = serializeUser(user);
                
                let token = createToken(user)

                let baseResponse = {
                    code:200,
                    success: true,
                    message: "User authenticated with success",
                }

                return {
                    response: baseResponse,
                    user,
                    token
                }
            } catch (error) {
                throw new ApolloError(error.message, 403);
            }
        }
    },

    Mutation: {
        registerUser: async (_, { newUser }, { User }) => {
            try {
                let {username, email } = newUser;

                let user = await User.findOne({ username });
                if (user) {
                    throw new Error("Username already taken");
                }
    
                user = await User.findOne({ email });
                if (user) {
                    throw new Error("Email already registred");
                }

                user = new User(newUser);
                
                // Hash the password
                user.password = await hash(newUser.password, 10);

                let result = await user.save();
                result = result.toObject();
                result.id = result._id;
                result = serializeUser(result);

                let token = createToken(result);
                
                let baseResponse = {
                    code:200,
                    success: true,
                    message: "User created with success",
                }
                return {
                    response: baseResponse,
                    user: result,
                    token
                }

            } catch (error) {
                throw new ApolloError(error.message, 400);
            }
        }
    }
}