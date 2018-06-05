var express   = require('express'),
    app       = express(),
    bps       = require('body-parser'),
    neo4j     = require('neo4j-driver'),
    { neo4jPass } = require('../../config/config.js'),
    driver    = neo4j.v1.driver("bolt://192.168.99.100", neo4j.v1.auth.basic('neo4j', neo4jPass)),
    morgan    = require('morgan');

app.use(bps.json());
app.use(bps.urlencoded({extended: true}));

app.use(morgan('dev'));

var session = driver.session(),
    username = 'dammy';

session.run("CREATE (user: User { username:'Dammy'}) RETURN user")
    .then(result => {
        console.log(result.records[0].get('user'));
        session.close();
        driver.close();
    })
    .catch(err => {
        console.log(err);
        driver.close();
    })


module.exports = app;