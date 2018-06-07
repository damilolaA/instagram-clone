const neo4j = require('neo4j-driver'),
			{ neo4jPass } = require('../../../config/config.js');

let driver = neo4j.v1.driver("bolt://192.168.99.100", neo4j.v1.auth.basic('neo4j', neo4jPass));

let session = driver.session();

module.exports = session;