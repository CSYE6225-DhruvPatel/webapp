import dotenv from 'dotenv';
import { daoGetVerifyEmailRecord } from '../dao/verify-email-dao.js';
import { sendResponse } from '../utils/response.js';

dotenv.config();

export const checkEmailIsVerified = async (req, res, next) => {
    try {
        const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
        const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':');

        var emailVerificationDetails = await daoGetVerifyEmailRecord(username);
        if (emailVerificationDetails.user_verified) {
          return next();
        } else{
            sendResponse({req, res, status: 403})
        }
    } catch ({err}) {
        console.log("Email verification details not available.")
        sendResponse({req, res, status: 503, err: err})
    }
  };
