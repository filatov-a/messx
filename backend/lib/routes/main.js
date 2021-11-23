const express = require("express");

const router = express.Router();

const controllerAuth = require("../controllers/auth.js");
const controller = require("../controllers/user.js");

const schemas = require("../schemas/schemas.js");
const middleware = require("../middleware/joi.js");
const role = require("../middleware/role");
const joi = require("../middleware/joi");

router.post("/api/auth/register", middleware(schemas.user_schema), controllerAuth.register);
router.get("/api/auth/register/verify-email/:token", controllerAuth.registerVerify);
router.post("/api/auth/login", controllerAuth.login);

router.get("/api/users", controller.getAllUsers);
router.get("/api/users/:user_id", controller.getUserById);
router.post("/api/users", role.isAdmin, joi(schemas.create_schema), controller.createUser);
router.patch("/api/users/:user_id", joi(schemas.admin_schema), controller.updateUser);
router.delete("/api/users/:user_id", controller.deleteUser);

module.exports = router;
