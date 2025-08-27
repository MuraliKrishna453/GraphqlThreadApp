export interface CreateUserPayload {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}
export interface GetUserTokenPayload {
    email: string;
    password: string;
}
declare class UserService {
    private static generateHashedPassword;
    static getUserToken(payload: GetUserTokenPayload): Promise<string>;
    private static getUserByEmail;
    static createUser(payload: CreateUserPayload): Promise<{
        email: string;
        password: string;
        id: string;
        firstName: string;
        lastName: string | null;
        profileImagesURL: string | null;
        salt: string;
    }>;
}
export default UserService;
//# sourceMappingURL=user.d.ts.map