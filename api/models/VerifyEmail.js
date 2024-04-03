import { DataTypes } from 'sequelize';

export const VerifyEmailModel = (sequelize) => {
    const VerifyEmail = sequelize.define('VerifyEmail', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "Email address not valid."
                },
            },
        },
        user_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        createdAt: 'link_expiry_time',
        updatedAt: 'account_updated',
    });
    return VerifyEmail;
}
