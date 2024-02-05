export const checkPayloadIsEmpty = (req, res, next) => {
    if(Object.keys(req.body).length || Object.keys(req.query).length ||  req.get('Content-Length') > 0) {
        console.log('Non empty payload, Bad request - Status code 400.')
        res.status(400).send();
    } else {
        return next();
    }
}