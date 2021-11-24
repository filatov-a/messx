const express = require("express");

const router = express.Router();

const controllerAuth = require("../controllers/auth.js");
const controllerCategories = require("../controllers/postscategories.js");
const controllerComments = require("../controllers/comments");
const controllerPosts = require("../controllers/posts");
const controllerMessages = require("../controllers/messages");
const controllerUser = require("../controllers/user.js");

const schemas = require("../schemas/schemas.js");
const middleware = require("../middleware/joi.js");
const role = require("../middleware/role");
const joi = require("../middleware/joi");
const multer = require("../middleware/multer");

router.get("/api/comments/:id", controllerComments.getCommentById);
router.get("/api/comments/:id/likes", controllerComments.getAllLikesFormComment);
router.post("/api/comments/:id/like", controllerComments.newLike);
router.patch("/api/comments/:id", controllerComments.updateComment);
router.delete("/api/comments/:id", controllerComments.deleteComment);
router.delete("/api/comments/:id/like", controllerComments.deleteLikeFromComment);

router.get("/categories", controllerCategories.getAllCategories);
router.get("/categories/:id", controllerCategories.getCategoryById);
router.get("/categories/:id/posts", controllerCategories.getAllPostsFormCategory);
router.post("/categories", controllerCategories.newCategory);
router.patch("/categories/:id", controllerCategories.updateCategory);
router.delete("/categories/:id", controllerCategories.deleteCategory);

router.get("/api/posts", controllerPosts.getAllPosts);
router.get("/api/posts/:id", controllerPosts.getPostById);
router.get("/api/posts/:id/comments", controllerPosts.getAllCommentsFormPost);
router.post("/api/posts/:id/comments", controllerPosts.newComment);
router.get("/api/posts/:id/categories", controllerPosts.getAllCategoriesFromPost);
router.get("/api/posts/:id/like", controllerPosts.getAllLikesFromPost);
router.post("/api/posts/", controllerPosts.newPost);
router.post("/api/posts/:id/like", controllerPosts.newLike);
router.patch("/api/posts/:id", controllerPosts.updatePost);
router.delete("/api/posts/:id", controllerPosts.deletePost);
router.delete("/api/posts/:id/like", controllerPosts.deleteLikeFromPost);

router.post("/auth/register", middleware(schemas.user_schema), controllerAuth.register);
router.get("/auth/register/verify-email/:token", controllerAuth.registerVerify);
router.post("/auth/login", controllerAuth.login);

router.get("/users", controllerUser.getAllUsers);
router.get("/users/:user_id", controllerUser.getUserById);
router.post("/users", role.isAdmin, joi(schemas.create_schema), controllerUser.createUser);
router.patch("/users/:user_id", joi(schemas.admin_schema), controllerUser.updateUser);
router.delete("/users/:user_id", controllerUser.deleteUser);
router.post("/users/avatar", multer.single("avatar"), role.isUser, controllerUser.setAvatar);

module.exports = router;
