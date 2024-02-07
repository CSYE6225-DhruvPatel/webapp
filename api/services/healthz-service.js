import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(String(process.env.DBNAME), String(process.env.USERNAME), String(process.env.PASSWORD), {
    host: String(process.env.HOST),
    // @ts-ignore
    dialect: process.env.DBDIALECT,
});


export const getConnection = async () => {
    try {
      await sequelize.authenticate();
      return {
          status: 200,
      }
    } catch ({err}) {
        console.log("DB connection error")
      return {
        status: 503,
      };
    }
  };