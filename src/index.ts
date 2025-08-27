import express from 'express';
import cors from 'cors';
import { expressMiddleware } from '@as-integrations/express5';
import createApolloGraphQLServer from './graphql/index.js';
import UserService from './services/user.js';

async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;
    app.use(express.json());


    app.get("/", (req, res) => {
        res.json({ message: 'Server is up and running....'});
    })


    const gqlServer = await createApolloGraphQLServer();
    app.use('/graphql', 
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(gqlServer, { context: async({req}) => {
            //@ts-ignore
            const token = req.headers['token'];
            try {
                const user = await UserService.decodeJwt(token);
                return { user };
            } catch (err) {
                return {};
            }
        } })
    );

    app.listen(PORT, () => {
        console.log(`Server started at PORT:${PORT}`);
    })
}

init()

