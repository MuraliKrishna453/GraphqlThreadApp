import { createHmac, randomBytes } from "crypto";
import { prismaClient } from "../lib/db.js";
import JWT from 'jsonwebtoken';
const JWT_SECRET = 'H@ppy@2025';
class UserService {
    static generateHashedPassword(salt, password) {
        const hashPassword = createHmac('sha256', salt).update(password).digest('hex');
        return hashPassword;
    }
    static async getUserToken(payload) {
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
        const res = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
        return res;
    }
    static getUserByEmail(email) {
        return prismaClient.user.findUnique({ where: { email } });
    }
    static async createUser(payload) {
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
}
export default UserService;
//# sourceMappingURL=user.js.map