import express from 'express';
import * as emailVerificationController from '../controllers/verify-email-controller.js';

const Router = express.Router();

Router.route('/')
    .get(emailVerificationController.verify)
    .head((req, res) => {
        console.log('Method not allowed - status 405.')
        res.status(405).send();
    })
    .all((req, res) => {
        console.log('Method not allowed - status 405.')
        res.status(405).send();
    })

export default Router;