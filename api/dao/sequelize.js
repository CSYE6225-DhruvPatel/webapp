import dotenv from "dotenv";
import { UserModel } from "../models/User.js";
import { Sequelize } from "sequelize";

// Load the environment variables
dotenv.config();

const sequelize = new Sequelize(String(process.env.DBNAME), String(process.env.USERNAME), String(process.env.PASSWORD), {
    host: String(process.env.HOST),
    dialect: process.env.DBDIALECT,
});

// Define models
export const User = UserModel(sequelize);

export const db = sequelize;

export const bootstrapdb = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Database bootstrapped successfully');
    } catch (error) {
        console.error('Error bootstrapping database:', error);
        throw error;
    }
}
