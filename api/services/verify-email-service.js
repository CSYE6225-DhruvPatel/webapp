import dotenv from 'dotenv';
import { daoGetVerifyEmailRecord, daoUpdateVerifyEmailRecord } from '../dao/verify-email-dao.js';

dotenv.config();

export const getEmailVerification = async (username) => {
    try {
        var emailVerificationDetails = await daoGetVerifyEmailRecord(username);
        if((Date.now() - emailVerificationDetails.email_sent.getTime())/(1000 * 60) < 2){
          console.log("User verified succefully!")
          var res = await daoUpdateVerifyEmailRecord(username);
          if(res){
            return {
              status: 200,
            }
          }
        } else {
          console.log("Link has expired.");
          return {
            status: 410
          }
        }
    } catch ({err}) {
        console.log("Email verification service error.")
      return {
        status: 400,
      };
    }
  };

