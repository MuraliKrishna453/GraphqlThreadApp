import type { CreateUserPayload, GetUserTokenPayload } from "../../services/user.js";
export declare const resolvers: {
    queries: {
        getUserToken: (_: any, payload: GetUserTokenPayload) => Promise<string>;
    };
    mutations: {
        createUser: (_: any, payload: CreateUserPayload) => Promise<string>;
    };
};
//# sourceMappingURL=resolvers.d.ts.map