import express from "express";

const router = express.Router();

import controllerActions from "./controlers/action.mjs";
import controllerUser from "./controlers/users.mjs";
import controllerChats from "./controlers/chats.mjs";
import controllerComments from "./controlers/comments.mjs";
import controllerPostsCategories from "./controlers/posts-categories.mjs";
import controllerChatsCategories from "./controlers/chats-categories.mjs";
import controllerPosts from "./controlers/posts.mjs";
import controllerMessages from "./controlers/messages.mjs";

router.post("/register", controllerActions.register);
router.get("/verify-email/:token", controllerActions.registerVerify);
router.post("/login", controllerActions.login);

router.get("/chats/:id", controllerChats.get);
router.post("/chats", controllerChats.create);
router.delete("/chats/:id", controllerChats.delete);

router.get("/users", controllerUser.getAll);
router.get("/users/:id", controllerUser.get);
router.post("/users", controllerUser.create);
router.patch("/users/:id", controllerUser.update);
router.delete("/users/:id", controllerUser.delete);
router.post("/users/avatar", controllerUser.setAvatar);

router.get("/api/comments/:id", controllerComments.get);
router.post("/api/comments/:id/like", controllerComments.like);
router.patch("/api/comments/:id", controllerComments.update);
router.delete("/api/comments/:id", controllerComments.delete);

router.get("/posts-categories", controllerPostsCategories.getAll);
router.get("/posts-categories/:id", controllerPostsCategories.get);
router.post("/posts-categories", controllerPostsCategories.create);
router.patch("/posts-categories/:id", controllerPostsCategories.update);
router.delete("/posts-categories/:id", controllerPostsCategories.delete);

router.get("/chats-categories", controllerChatsCategories.getAll);
router.get("/chats-categories/:id", controllerChatsCategories.get);
router.post("/chats-categories", controllerChatsCategories.create);
router.patch("/chats-categories/:id", controllerChatsCategories.update);
router.delete("/chats-categories/:id", controllerChatsCategories.delete);

router.get("/api/posts", controllerPosts.getAll);
router.get("/api/posts/:id", controllerPosts.get);
router.post("/api/posts/", controllerPosts.create);
router.post("/api/posts/:id/like", controllerPosts.like);
router.patch("/api/posts/:id", controllerPosts.update);
router.delete("/api/posts/:id", controllerPosts.delete);

router.get("/messages", controllerMessages.get);
router.post("/messages", controllerMessages.create);
router.patch("/messages/:id", controllerMessages.update);
router.delete("/messages/:id", controllerMessages.delete);

export default router;
