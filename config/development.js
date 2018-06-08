module.exports = {
    port: process.env.PORT || 4000,
    neo4jPass: process.env.NEO4J_PASS,
    JWT_SECRET: process.env.JWT_SECRET,
    SENDGRID_USERNAME: process.env.SENDGRID_USERNAME,
    SENDGRID_PASSWORD: process.env.SENDGRID_PASSWORD
}