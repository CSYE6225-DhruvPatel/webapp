import express from 'express';
import * as userController from '../controllers/user-controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { sendResponse } from '../utils/response.js';

const Router = express.Router();

Router.route('/self')
    .get(authenticate, userController.get)
    .put(authenticate, userController.put)
    .all((req, res) => {
        console.log('Method not allowed - status 405.')
        sendResponse({req, res, status: 405})
    })


Router.route('/')
    .post(userController.create)
    .all((req, res) => {
        console.log('Method not allowed - status 405.')
        sendResponse({req, res, status: 405})
    })

export default Router;