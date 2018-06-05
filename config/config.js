
let config = {
    dev: 'development',
    prod: 'production',
    test: 'test'
}

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

config.env = process.env.NODE_ENV;

const envConfig = require('./' + config.env);

module.exports = envConfig;