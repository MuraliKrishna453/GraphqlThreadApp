import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
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

        `, //Schemas
        resolvers: {
            Query: {
                hello: () => `Hey siri, Im running`,
                say: (_, { name: String }) => `Hey ${name}, How are doing?`
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