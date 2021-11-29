import jwt from "jsonwebtoken";
import mail from "../utils/email.mjs";
import argon2  from "argon2";
import config  from "../config/config.cjs";
import schemas from "../schemas/schemas.mjs";
import joi from "../middleware/joi.mjs"

export default class Base {
    static jwt = jwt;
    static mail = mail;
    static argon2 = argon2;
    static config = config;
    static schemas = schemas;
    static joi = joi;
}
