import express from 'express';
import * as userController from '../controllers/user-controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { sendResponse } from '../utils/response.js';
import { checkDbHealth } from '../middleware/check-db-health.js';
import { checkPayloadIsEmpty } from '../middleware/payload.js';
import { cehckValidSchemaForPut, checkValidSchemaForPost } from '../middleware/check-json-schema.js';

const Router = express.Router();

const schema_put = [
    "first_name",
    "last_name",
    "password"
]

const schema_post = [
    "first_name",
    "last_name",
    "username",
    "password"
]

const ignore = ["account_created", "account_updated"]

Router.route('/self')
    .get(checkDbHealth, authenticate, checkPayloadIsEmpty,userController.get)
    .put(checkDbHealth, authenticate, cehckValidSchemaForPut(schema_put, ignore), userController.put)
    .all((req, res) => {
        console.log('Method not allowed - status 405.')
        sendResponse({req, res, status: 405})
    })


Router.route('/')
    .post(checkDbHealth, checkValidSchemaForPost(schema_post, ignore), userController.create)
    .all((req, res) => {
        console.log('Method not allowed - status 405.')
        sendResponse({req, res, status: 405})
    })

export default Router;