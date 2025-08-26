import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { prismaClient } from './lib/db.js';
async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;
    app.use(express.json());
    // create GraphQL server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
                say(name: String): String
            }
            type Mutation {
                createUser(firstName: String, lastName: String, email: String, password: String!): Boolean
            }
        `, //Schemas
        resolvers: {
            Query: {
                hello: () => `Hey siri, Im running`,
                say: (_, { name: String }) => `Hey ${name}, How are doing?`
            },
            Mutation: {
                createUser: async (_, { firstName, lastName, email, password }) => {
                    await prismaClient.user.create({
                        data: {
                            email,
                            firstName,
                            lastName,
                            password,
                            salt: 'random_salt'
                        }
                    });
                    return true;
                }
            }
        },
    });
    //Start the gqlServer
    await gqlServer.start();
    app.get("/", (req, res) => {
        res.json({ message: 'Server is up and running....' });
    });
    app.use('/graphql', cors(), express.json(), expressMiddleware(gqlServer));
    app.listen(PORT, () => {
        console.log(`Server started at PORT:${PORT}`);
    });
}
init();
//# sourceMappingURL=index.js.map