import express from 'express';
import * as healthzController from '../controllers/healthz-controller.js'
import { checkPayloadIsEmpty } from '../middleware/payload.js';

const Router = express.Router();

Router.route('/')
    .get(checkPayloadIsEmpty, healthzController.get)
    .head((req, res) => {
        console.log('Method not allowed - status 405.')
        res.status(405).send();
    })
    .all((req, res) => {
        console.log('Method not allowed - status 405.')
        res.status(405).send();
    })

export default Router;