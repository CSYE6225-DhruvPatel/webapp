export const checkInvalidJson = (err, req, res, next) => {
    // @ts-ignore
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.log('Invalid JSON, Bad request - status 400.')
        res.status(400).json();
        return;
    }
    next();
}