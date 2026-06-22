const { Router } = require("express");
const addController = require("../controllers/addController");
const addRouter = Router();

addRouter.get("/", addController.addGet);
addRouter.get("/evidence", addController.addEvidenceGet);
addRouter.get("/owner", addController.addOwnerGet);
addRouter.get("/type", addController.addEvidenceTypeGet);
addRouter.get("/case", addController.addCaseGet);
addRouter.post("/evidence", addController.addEvidencePost);
addRouter.post("/owner", addController.addCasePost);
addRouter.post("/type", addController.addEvidenceTypePost);
addRouter.post("/case", addController.addCasePost);

module.exports = addRouter