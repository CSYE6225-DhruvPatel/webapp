import { sendResponse } from "../utils/response.js";

export const validateSchemaForPost = (requiredProperties, optionalProperties) => {
    return (req, res, next) => {
        if (!Object.keys(req.query).length) {
            const requestBodyKeys = Object.keys(req.body);

            if (optionalProperties) {
                optionalProperties.forEach(optionalProp => {
                    const optionalPropIndex = requestBodyKeys.indexOf(optionalProp);
                    if (optionalPropIndex > -1) {
                        requestBodyKeys.splice(optionalPropIndex, 1);
                        delete req.body[optionalProp];
                    }
                });
            }

            const hasAllRequiredProperties = requiredProperties.every(reqProp => requestBodyKeys.includes(reqProp));
            const hasNoExtraProperties = requestBodyKeys.every(reqKey => requiredProperties.includes(reqKey));
            const isValidRequest = hasAllRequiredProperties && hasNoExtraProperties;

            if (!isValidRequest) {
                sendResponse({ req, res, status: 400 });
                return;
            }
        }

        return next();
    };
};

export const validateSchemaForPut = (schemaKeys, optionalKeys) => {
    return (req, res, next) => {
        let isValidRequest = false;

        if (!Object.keys(req.query).length) {
            const requestBodyKeys = Object.keys(req.body);

            if (optionalKeys) {
                optionalKeys.forEach(optionalKey => {
                    const optionalKeyIndex = requestBodyKeys.indexOf(optionalKey);
                    if (optionalKeyIndex > -1) {
                        requestBodyKeys.splice(optionalKeyIndex, 1);
                        delete req.body[optionalKey];
                    }
                });
            }

            const hasAtLeastOneSchemaProperty = schemaKeys.some(schemaKey => requestBodyKeys.includes(schemaKey));
            const hasNoExtraProperties = requestBodyKeys.every(requestKey => schemaKeys.includes(requestKey));
            isValidRequest = hasAtLeastOneSchemaProperty && hasNoExtraProperties;
        }

        if (!isValidRequest) {
            sendResponse({ req, res, status: 400 });
            return;
        }

        return next();
    };
};