import type { CreateUserPayload, GetUserTokenPayload } from "../../services/user.js";
export declare const resolvers: {
    queries: {
        getUserToken: (_: any, payload: GetUserTokenPayload) => Promise<string>;
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
        createUser: (_: any, payload: CreateUserPayload) => Promise<string>;
    };
};
//# sourceMappingURL=resolvers.d.ts.map