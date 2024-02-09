import dotenv from 'dotenv';
import { daoAuthenticateDbConnection } from '../dao/healthz-dao.js';

dotenv.config();

export const getConnection = async () => {
    try {
      await daoAuthenticateDbConnection();
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
