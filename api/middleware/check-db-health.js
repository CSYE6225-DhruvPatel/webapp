import { sendResponse } from "../utils/response.js";
import { getConnection } from "../services/healthz-service.js"

export const checkDbHealth = async (req, res, next) => {
    try {
        const { status } = await getConnection();
        if(status === 200) {
            return next();
        } else {
            sendResponse({ req, res, status: 503});
        }
    } catch (err) {
        return  sendResponse({req, res, status: 400 }) ;
    }
}
