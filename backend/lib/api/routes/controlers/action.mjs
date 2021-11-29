import register from "../../../use-case/actions/register.mjs";
import registerVerify from "../../../use-case/actions/register-verify.mjs";
import login from "../../../use-case/actions/login.mjs";
import getToken from '../../../utils/getToken.mjs';

export default {
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
