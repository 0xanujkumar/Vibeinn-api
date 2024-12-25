'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

// Load configuration
const config = require(path.join(__dirname, '../config/config'))[process.env.NODE_ENV || 'development'];

const db = {};

// Initialize Sequelize using the connection string
let sequelize;
if (config.use_env_variable) {
    console.log("Initializing DB connection using environment variable...");
    sequelize = new Sequelize(process.env[config.use_env_variable], {
        
    });
    console.log("Connection established successfully...");
} else {
    console.log("Initializing DB connection using connection string...");
    sequelize = new Sequelize(config.connectionString, {
        dialect: 'postgres',
        dialectOptions: config.dialectOptions,
        timezone: "Asia/Calcutta",
        pool: {
            max: 50,
            min: 0,
            idle: 20000,
            evict: 15000,
            acquire: 30000,
        },
    });
    console.log("Connection established successfully...");
}

// Dynamically load all models in the models directory
fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

// Associate models if associations are defined
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
