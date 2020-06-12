module.exports = {
    development: {
        port: process.env.PORT || 3000,
        dbURL: `mongodb+srv://user:${process.env.DB_PASSWORD}@softuni-lmx5i.mongodb.net/cubicle?retryWrites=true&w=majority`
    },
    production: {}
};