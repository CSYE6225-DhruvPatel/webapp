import { daoGetUserByUsername, daoCreateUser, daoUpdateUser } from "../dao/user-dao.js";
import { hashPassword, validatePassword } from "../utils/bcrypt.js";
import { publishUserData } from "../utils/pubsub.js";

export async function authenticateUser({ username, password }) {
    let userId = null;
    const user = await daoGetUserByUsername(username);
    if(user){
        if(await validatePassword(password, user.password)){
            userId = user.id;
        }
    }
    return userId;
}

export async function getUserByUsername(username) {
    const user = await daoGetUserByUsername(username);
    // Remove sensitive data before returning
    if (user) {
        delete user.password;
    }
    return user;
}

export async function createUser(user) {
    // Hash the password before storing it in the database
    user.password = await hashPassword(user.password);

    const createdUser = await daoCreateUser(user);

    // Remove sensitive data before returning
    if (createdUser) {
        delete createdUser.password;
        await publishUserData({userData: createdUser});
    }

    return createdUser;
}

export async function updateUser(username, user) {
    // If password is provided, hash it before updating
    if (user.password) {
        user.password = await hashPassword(user.password);
    }

    const updatedUser = await daoUpdateUser(username, user);
    return updatedUser;
}
