import { authenticateDbConnection } from '../dao/sequelize.js';

export const daoAuthenticateDbConnection = async () => {
    await authenticateDbConnection();
}