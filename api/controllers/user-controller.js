import * as userService from "../services/user-service.js";
import { sendResponse } from "../utils/response.js";

export const create = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        sendResponse({ req, res, status: 201, data: user, msg: 'User created successfully.'});
    } catch (error) {
        sendResponse({ req, res, status: 400, err: error});
    }
}

export const get = async (req, res) => {
    try {
        const user = await userService.getUserByUsername(req.user.username);
        sendResponse({ req, res, status: 200, data: user, msg: 'User recieved successfully.'});
    } catch (error) {
        console.log(err.message)
        sendResponse({ req, res, status: 400, err: error, msg: 'Error while getting user.'});
    }
}

export const put = async (req, res) => {
    try {
        await userService.updateUser(req.user.username, req.body);
        sendResponse({ req, res, status: 204, msg: 'User edited succesfully.'});
    } catch (error) {
        sendResponse({ req, res, status: 400, err: error, msg: 'Error while editing user.'});
    }
}