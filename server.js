const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const publicRoutes = require('./routes/public');
const generalConfig = require("./config/generalConfig");
// const centralLogger = require('./config/logsConfig');
const { logRequest, logRequestResponse} = require('./helpers/loggingHelper')
dotenv.config();


const initializeServer = (port) => {
  try {
    const server = express();
;
    server.use(cors());
    server.use(express.json({ extended: false, limit: "20mb" }));
    server.use(express.text({ type: "*/xml" }));
    server.use(logRequestResponse);
    server.get('/status' , (req, res) => { 
      res.send({ status: "success", message: "Welcome to Vineinn APIs!" }); 
    });
    server.use('/api/v1', publicRoutes);
    server.use('/health', require("./routes/health"));

    server.listen(port, () =>
      console.log(`Server instance listening @port: ${port}`)
    );
    return server;
  } catch (err) {
    console.error(err);
  }
};

module.exports = initializeServer(generalConfig.serverPort);
