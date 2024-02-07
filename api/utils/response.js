export const sendResponse = ({ req, res, status, headers, data, err }) => {
    res.status(status)

    if (headers) {
        for (const [key, value] of Object.entries(headers)) {
            res.header(key, value);
        }
    }

    res.json(data);
}