import * as bcrypt from 'bcrypt'

export default class PasswordUtil { 
    static async hashPassword(rawPassword : string) : Promise<string> { 
        const SALT = await bcrypt.genSalt();
        return await bcrypt.hash(rawPassword , SALT);
    }

    static async comparePasswords(rawPassword : string , hash: string) : Promise<boolean> { 
        return bcrypt.compare(rawPassword , hash);
    }
}