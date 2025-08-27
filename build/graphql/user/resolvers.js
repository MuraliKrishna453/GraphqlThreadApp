import UserService from "../../services/user.js";
const queries = {
    getUserToken: async (_, payload) => {
        const token = await UserService.getUserToken(payload);
        return token;
    },
    getLoggedInUser: async (_, params, context) => {
        console.log(context, 'context');
        if (!context || !context.user) {
            throw new Error('No user found');
        }
        const res = await UserService.getUserById(context.user.id);
        return res;
    }
};
const mutations = {
    createUser: async (_, payload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    }
};
export const resolvers = { queries, mutations };
//# sourceMappingURL=resolvers.js.map