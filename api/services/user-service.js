import { daoGetUserByUsername, daoCreateUser, daoUpdateUser } from "../dao/user-dao.js";
import { hashPassword, validatePassword } from "../utils/bcrypt.js";

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

// export async function login(username, password) {
//     try {
//         const user = await daoGetUserByUsername(username);
//         if (!user) {
//             return { success: false, error: 'User not found' };
//         }

//         const isPasswordValid = await validatePassword(password, user.password);

//         if (!isPasswordValid) {
//             return { success: false, error: 'Invalid password' };
//         }

//         // Return user information without the password
//         delete user.password;
//         return { success: true, user };
//     } catch (error) {
//         return { success: false, error: error.message };
//     }
// }
