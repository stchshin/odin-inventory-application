const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);
indexRouter.get("/evidences", indexController.evidencesGet);
indexRouter.get("/evidences/edit/:evidenceId", indexController.evidenceEditGet);
indexRouter.post("/evidences/edit/:evidenceId", indexController.evidenceEditPost);
indexRouter.get("/evidences/:evidenceId", indexController.evidenceGet);
indexRouter.post("/evidences/delete", indexController.evidenceDeletePost);

module.exports = indexRouter