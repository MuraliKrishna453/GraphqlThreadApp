export declare const User: {
    typeDefs: string;
    queries: string;
    resolvers: {
        queries: {
            getUserToken: (_: any, payload: import("../../services/user.js").GetUserTokenPayload) => Promise<string>;
            getLoggedInUser: (_: any, params: any, context: any) => Promise<{
                email: string;
                password: string;
                id: string;
                firstName: string;
                lastName: string | null;
                profileImagesURL: string | null;
                salt: string;
            } | null>;
        };
        mutations: {
            createUser: (_: any, payload: import("../../services/user.js").CreateUserPayload) => Promise<string>;
        };
    };
    mutations: string;
};
//# sourceMappingURL=index.d.ts.map