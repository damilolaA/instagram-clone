module.exports = {
    port: process.env.PORT || 4000,
    neo4jPass: process.env.NEO4J_PASS,
    JWT_SECRET: process.env.JWT_SECRET,
    SENDGRID_USERNAME: process.env.SENDGRID_USERNAME,
    SENDGRID_PASSWORD: process.env.SENDGRID_PASSWORD,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET
}