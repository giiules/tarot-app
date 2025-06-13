let config = {};
config.sql = {};

config.sql.host = process.env.HOST;
config.sql.port = 3306;
config.sql.user = process.env.USER;
config.sql.password = process.env.PASSWORD;
config.sql.database = process.env.DATABASE;

module.exports = config;