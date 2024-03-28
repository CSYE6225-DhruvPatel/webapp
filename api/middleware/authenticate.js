import { authenticateUser } from "../services/user-service.js"
import { sendResponse } from "../utils/response.js";

export const authenticate = async (req, res, next) => {
    try {
        const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
        const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':');
        
        if (username && password) {
            //check if login and password are in the database
            const UserId = await authenticateUser({ username, password })
            
            if(UserId) {
                //User logged in.
                req.user = { username, UserId };

                //add authenticate headers
                res.set({
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Accept,Origin',
                    'expires': '-1',
                });
                return next();
            }
        }
    
        const authenticateHeader = username && password ? {} : { "WWW-Authenticate": 'Basic realm="Access to the staging site", charset="UTF-8"' };
        sendResponse({req, res, status: 401, headers: authenticateHeader, err: new Error('Authentication failed') }) 

    } catch (err) {
        sendResponse({req, res, status: 400, err: new Error('Bad Request') }) 
    }
}