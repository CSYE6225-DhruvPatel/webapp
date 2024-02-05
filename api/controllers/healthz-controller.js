import * as healthZService from '../services/healthz-service.js';

export const get = async (req, res) => {
    const { status } = await healthZService.getConnection();
    if (status === 200) {
        console.log('healtz-controller status success: ', status)
        res.status(200).send();
    } else {
        console.log('healtz-controller status code returned: ', status)
        res.status(status).send();
    }
}