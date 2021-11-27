const register = require("../../../use-case/actions/register");
const registerVerify = require("../../../use-case/actions/register-verify");
const login = require("../../../use-case/actions/login");
const getToken = require('../../../utils/getToken');

module.exports = {
    register: async (req, res) => {
        try {
            const token = await register.execute({...req.body})
            res.send(token)
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    },
    registerVerify: async (req, res) => {
        try {
            const token = getToken(req);
            console.log(token)
            await registerVerify.execute(token);
            res.send("ok")
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    },
    login: async (req, res) => {
        try {
           const token = await login.execute({...req.body});
            res.send(token)
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    }
}
