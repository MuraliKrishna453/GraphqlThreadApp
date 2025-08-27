import type { CreateUserPayload, GetUserTokenPayload } from "../../services/user.js";
import UserService from "../../services/user.js";

const queries = {
    getUserToken: async(_:any, payload: GetUserTokenPayload) => {
        const token = await UserService.getUserToken(payload);
        return token;
    },
    getLoggedInUser: async(_: any, params: any, context: any) => {
        if (!context || !context.user) {
            throw new Error('No user found');
        }
        const res = await UserService.getUserById(context.user.id);
        return res;
    }
};
const mutations = {
    createUser: async(_: any, payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    }
};

export const resolvers = { queries, mutations};