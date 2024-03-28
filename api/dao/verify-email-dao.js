import { VerifyEmail } from "../dao/sequelize.js";

export const daoGetVerifyEmailRecord = async (username) => {
    const userVerificationRecord = await VerifyEmail.findOne({
        where: { username }
    });
    return userVerificationRecord?.dataValues;
};

// Creation will be done in Cloud function
export const daoCreateVerifyEmailRecord = async (username) => {
    const createdVerifyEmail = await VerifyEmail.create({ username });
    return createdVerifyEmail?.dataValues;
};

export const daoUpdateVerifyEmailRecord = async (username) => {
    const result = await VerifyEmail.update(
        { user_verified: true },
        {
            where: { username }
        }
    );
    return result?.dataValues;
}
