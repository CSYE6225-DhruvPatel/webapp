import express from 'express';
import * as userController from '../controllers/user-controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { sendResponse } from '../utils/response.js';
import { checkPayloadIsEmpty } from '../middleware/payload.js';
import { validateSchemaForPost, validateSchemaForPut } from '../middleware/check-schema.js';
import { dbHealth } from '../middleware/check-dbhealth.js';

const Router = express.Router();

const schema = [
    "first_name",
    "last_name",
    "password"
]

const ignore = ["account_created", "account_updated"]

Router.route('/self')
    .get(dbHealth, authenticate, checkPayloadIsEmpty, userController.get)
    .put(dbHealth, authenticate, validateSchemaForPut(schema, ignore), userController.put)
    .all((req, res) => {
        console.log('Method not allowed - status 405.')
        sendResponse({req, res, status: 405})
    })


Router.route('/')
    .post(dbHealth, validateSchemaForPost(schema, ignore), userController.create)
    .all((req, res) => {
        console.log('Method not allowed - status 405.')
        sendResponse({req, res, status: 405})
    })

export default Router;