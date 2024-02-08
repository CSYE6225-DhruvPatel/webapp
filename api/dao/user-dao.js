import { User } from "../dao/sequelize.js";

export const daoGetUserByUsername = async (username) => {
    const user = await User.findOne({
        where: { username }
    });
    return user.dataValues;
};

export const daoCreateUser = async (user) => {
    const createdUser = await User.create({ ...user });
    return createdUser?.dataValues;
};

export const daoUpdateUser = async (username, user) => {
    const result = await User.update(user, {
        where: { username }
    });
    return result?.dataValues;
};
