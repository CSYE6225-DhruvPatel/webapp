import * as verifyEmailService from '../services/verify-email-service.js';
import { sendResponse } from '../utils/response.js';

export const verify = async (req, res) => {
    try {
        var username = req.query.username;
        const { status } = await verifyEmailService.getEmailVerification(username);
        if (status === 200) {
            console.log('verify email successful: ', status)
            sendResponse({ req, res, status })
        } else if (status === 410) {
            console.log('verify email status code returned: ', status)
            sendResponse({ req, res, status: 410})
        } else {
            console.log('Email verification service unavailable: ', status)
            sendResponse({ req, res, status: 503})
        }
    } catch (error) {
        sendResponse({req, res, status: 400, err: error})
    }
}
