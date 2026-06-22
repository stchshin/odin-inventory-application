const { Router } = require("express");
const browseController = require("../controllers/browseController");
const browseRouter = Router();

browseRouter.get("/", browseController.browseGet);
browseRouter.get("/types/edit/:typeId", browseController.typeEditGet);
browseRouter.post("/types/edit/:typeId", browseController.typeEditPost);
browseRouter.get("/types", browseController.browseTypesGet);
browseRouter.get("/types/:typeId", browseController.browseTypeGet);
browseRouter.get("/games", browseController.browseGamesGet);
browseRouter.get("/games/edit/:caseId", browseController.caseEditGet);
browseRouter.post("/games/edit/:caseId", browseController.caseEditPost);
browseRouter.get("/games/:gameId", browseController.browseGameGet);
browseRouter.get("/games/:gameId/:caseId", browseController.browseCaseGet);
browseRouter.post("/types/delete", browseController.browseTypeDeletePost);
browseRouter.post("/games/delete", browseController.browseCaseDeletePost);

module.exports = browseRouter