export declare const User: {
    typeDefs: string;
    queries: string;
    resolvers: {
        queries: {
            getUserToken: (_: any, payload: import("../../services/user.js").GetUserTokenPayload) => Promise<string>;
        };
        mutations: {
            createUser: (_: any, payload: import("../../services/user.js").CreateUserPayload) => Promise<string>;
        };
    };
    mutations: string;
};
//# sourceMappingURL=index.d.ts.map