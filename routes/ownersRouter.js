const { Router } = require("express");
const ownersController = require("../controllers/ownersController");
const ownersRouter = Router();

ownersRouter.get("/", ownersController.ownersGet);
ownersRouter.get("/delete", ownersController.ownerDeletePost);
ownersRouter.get("/edit/:ownerId", ownersController.ownerEditGet);
ownersRouter.post("/edit/:ownerId", ownersController.ownerEditPost);
ownersRouter.get("/:ownerId", ownersController.ownerGet);

module.exports = ownersRouter