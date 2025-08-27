import JWT from 'jsonwebtoken';
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
    static decodeJwt(token: any): string | JWT.JwtPayload;
    static getUserById(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        password: string;
        id: string;
        firstName: string;
        lastName: string | null;
        profileImagesURL: string | null;
        salt: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
export default UserService;
//# sourceMappingURL=user.d.ts.map