import { User } from "../sequelize.js";
import { hashPassword, validatePassword } from "../utils/bcrypt.js";

export const authenticateUser = async ({username, password}) => {
    let UserId = null;
    const result = await User.findOne({
        where: {
            username,
        },
    });

    const user = result ? result.dataValues : null

    if(user && (await validatePassword(password, user.password))) {
        UserId = user.id;
    }
    return UserId;
}

export const getUserByName = async (username) => {
    const user = await User.findOne({
        where: {
            username
        }
    });

    delete user.dataValues.password;

    return user;
}


export const createUser = async (user) => {
    user.password = await hashPassword(user.password);

    const createdUser = await User.create({
        ...user
    })

    delete createdUser.dataValues.password;

    return createdUser.dataValues;
}

export const updateUser = async(username, user) => {
    if(user.password) {
        user.password = await hashPassword(user.password);
    }

    const result = await User.update(user, {
        where: {
            username
        }
    })

    const updatedUser = result.dataValues;

    return updatedUser;
}