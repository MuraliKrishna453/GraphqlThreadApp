import express from 'express';
import cors from 'cors';
import { expressMiddleware } from '@as-integrations/express5';
import createApolloGraphQLServer from './graphql/index.js';
async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;
    app.use(express.json());
    app.get("/", (req, res) => {
        res.json({ message: 'Server is up and running....' });
    });
    const gqlServer = await createApolloGraphQLServer();
    app.use('/graphql', cors(), express.json(), expressMiddleware(gqlServer));
    app.listen(PORT, () => {
        console.log(`Server started at PORT:${PORT}`);
    });
}
init();
//# sourceMappingURL=index.js.map