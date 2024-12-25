const express = require("express");
const router = express.Router();

router.get('/', async (_req, res, _next) => {
    let responseTime = process.hrtime();
    const healthcheck = {
        uptime: format(process.uptime()), 
        responsetime: `${responseTime[0] * 1000 + responseTime[1] / 1000000} ms`, 
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        res.send(healthcheck);
    } catch (error) {
        healthcheck.message = error;
        res.status(503).send();
    }
});

function format(seconds) {
    function pad(s) {
        return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60*60));
    var minutes = Math.floor(seconds % (60*60) / 60);
    var seconds = Math.floor(seconds % 60);
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

module.exports = router;