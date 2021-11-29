import express from "express";

const router = express.Router();

import controllerActions from "./controlers/action.mjs";
// const controllerCategories = require("../controllers/postscategories.js");
// const controllerComments = require("../controllers/comments");
// const controllerPosts = require("../controllers/posts");
// const controllerMessages = require("../controllers/messages");
// const controllerUser = require("../controllers/users.mjs");

// const schemas = require("../schemas/schemas.mjs");

router.post("/register", controllerActions.register);
router.get("/verify-email/:token", controllerActions.registerVerify);
router.post("/login", controllerActions.login);
//
// router.get("/api/comments/:id", controllerComments.getCommentById);
// router.get("/api/comments/:id/likes", controllerComments.getAllLikesFormComment);
// router.post("/api/comments/:id/like", controllerComments.newLike);
// router.patch("/api/comments/:id", controllerComments.updateComment);
// router.delete("/api/comments/:id", controllerComments.deleteComment);
// router.delete("/api/comments/:id/like", controllerComments.deleteLikeFromComment);
//
// router.get("/categories", controllerCategories.getAllCategories);
// router.get("/categories/:id", controllerCategories.getCategoryById);
// router.get("/categories/:id/posts", controllerCategories.getAllPostsFormCategory);
// router.post("/categories", controllerCategories.newCategory);
// router.patch("/categories/:id", controllerCategories.updateCategory);
// router.delete("/categories/:id", controllerCategories.deleteCategory);
//
// router.get("/api/posts", controllerPosts.getAllPosts);
// router.get("/api/posts/:id", controllerPosts.getPostById);
// router.get("/api/posts/:id/comments", controllerPosts.getAllCommentsFormPost);
// router.post("/api/posts/:id/comments", controllerPosts.newComment);
// router.get("/api/posts/:id/categories", controllerPosts.getAllCategoriesFromPost);
// router.get("/api/posts/:id/like", controllerPosts.getAllLikesFromPost);
// router.post("/api/posts/", controllerPosts.newPost);
// router.post("/api/posts/:id/like", controllerPosts.newLike);
// router.patch("/api/posts/:id", controllerPosts.updatePost);
// router.delete("/api/posts/:id", controllerPosts.deletePost);
// router.delete("/api/posts/:id/like", controllerPosts.deleteLikeFromPost);



// router.get("/users", controllerUser.getAllUsers);
// router.get("/users/:user_id", controllerUser.getUserById);
// router.post("/users", role.isAdmin, joi(schemas.create_schema), controllerUser.createUser);
// router.patch("/users/:user_id", joi(schemas.admin_schema), controllerUser.updateUser);
// router.delete("/users/:user_id", controllerUser.deleteUser);
// router.post("/users/avatar", multer.single("avatar"), role.isUser, controllerUser.setAvatar);

export default router;
