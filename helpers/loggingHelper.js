// const centralLogger = require("../config/logsConfig");

function logRequest(req, res, next) {
    const { method, url, body} = req;
    //const body = JSON.stringify(req.body, null, 2);
    console.log(`${method}  ${url} - ${req.headers.androidappversion} - ${JSON.stringify(body)}`);
    next();
}

function logRequestResponse(req, res, next) {
    const start = Date.now();
    const { method, url, body} = req;
    console.log(`${method}  ${url} - ${req.headers.androidappversion} - ${req.ip} - ${JSON.stringify(body)}`);

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${method} ${url} ${res.statusCode}  ${duration}ms`) // res.locals.data
    });

    next();
}

module.exports = {
    logRequest,
    logRequestResponse
}