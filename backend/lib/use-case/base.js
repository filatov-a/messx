const jwt = require("jsonwebtoken");
const mail = require("../utils/email")
const argon2 = require("argon2")
const config = require("../config/config")
const schemas = require("../schemas/schemas")
const joi = require("../middleware/joi")

module.exports = class Base {
    static jwt = jwt;
    static mail = mail;
    static argon2 = argon2;
    static config = config;
    static schemas = schemas;
    static joi = joi;
}
