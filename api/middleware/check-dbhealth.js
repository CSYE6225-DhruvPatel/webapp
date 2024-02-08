import { sendResponse } from "../utils/response.js";
import * as healthZService from "../services/healthz-service.js"

export const dbHealth = async (req, res, next) => {
    try {
        const { status } = await healthZService.getConnection();

        if(status === 200) {
            return next();
        } else {
            sendResponse({ req, res, status: 503});
        }
    } catch (err) {
        return  sendResponse({req, res, status: 400 }) ;
    }
}