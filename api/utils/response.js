import { logger } from './logger.js';

export const sendResponse = ({ req, res, status, headers, data, err, msg }) => {
    logger.info(`Received request: ${req.method} ${req.url}`);
    res.status(status);

    if (headers) {
        for (const [key, value] of Object.entries(headers)) {
            res.header(key, value);
        }
    }

    logger.info('Sending response:', { status, data, msg });
    res.json(data);
    if (err) {
        logger.error('Error occurred:', { error: err });
    }
};
