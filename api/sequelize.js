import dotenv from "dotenv";
import { UserModel } from './models/User.js';
import { Sequelize } from "sequelize";

// Load the environment variables
dotenv.config();

// Initialize the database connection
// @ts-ignore
const sequelize = new Sequelize(String(process.env.DBNAME), String(process.env.USERNAME), String(process.env.PASSWORD), {
    host: String(process.env.HOST),
    // @ts-ignore
    dialect: process.env.DBDIALECT,
});

//Models
export const User = UserModel(sequelize);

export const bootstrapdb = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Bootstrapped');
    } catch (error) {
        console.log(error);
    }
}