import { createHmac, randomBytes } from "crypto";
import { prismaClient } from "../lib/db.js";
import JWT from 'jsonwebtoken';

const JWT_SECRET = 'H@ppy@2025';

export interface CreateUserPayload {
    firstName: string,
    lastName?: string,
    email: string,
    password: string,
}

export interface GetUserTokenPayload {
    email: string,
    password: string,
}

class UserService {

    private static generateHashedPassword(salt: string, password: string) {
        const hashPassword = createHmac('sha256', salt).update(password).digest('hex');
        return hashPassword;
    }

    public static async getUserToken(payload: GetUserTokenPayload) {
        const { email, password } = payload;
        const user = await UserService.getUserByEmail(email);

        if (!user) {
            throw new Error('Invalid user');
        }

        const salt = user.salt;
        const hashPassword = await UserService.generateHashedPassword(salt, password);

        if (user.password !== hashPassword) {
             throw new Error('Invalid credentials');
        }

        const res = JWT.sign({ id: user.id, email: user.email}, JWT_SECRET);

        return res;
    }

    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({where: { email }})
    }

    public static async createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload;
        const salt = randomBytes(32).toString('hex');
        const hashPassword = await UserService.generateHashedPassword(salt, password);

        return prismaClient.user.create({
            data: {
                firstName,
                lastName: lastName ?? null,
                email,
                password: hashPassword,
                salt
            }
        });
    }

    public static decodeJwt(token: any) {
        return JWT.verify(token, JWT_SECRET);
    }

    public static getUserById(id: string) {
        return prismaClient.user.findUnique({ where: { id}})
    }
}

export default UserService;