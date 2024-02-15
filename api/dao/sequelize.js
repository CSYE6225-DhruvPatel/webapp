import dotenv from "dotenv";
import { UserModel } from "../models/User.js";
import { Sequelize } from "sequelize";

// Load the environment variables
dotenv.config();

const sequelizeInstance = new Sequelize(String(process.env.DBNAME), String(process.env.USERNAME), String(process.env.PASSWORD), {
    host: "localhost",
    dialect: "postgres",
});

// Define models
export const User = UserModel(sequelizeInstance);

export const db = sequelizeInstance;

export const authenticateDbConnection = async () => { 
    await sequelizeInstance.authenticate(); 
}

export const bootstrapdb = async () => {
    try {
        await authenticateDbConnection();
        await sequelizeInstance.sync({ alter: true });
        console.log('Database bootstrapped successfully');
    } catch (error) {
        console.error('Error bootstrapping database:', error);
        throw error;
    }
}
