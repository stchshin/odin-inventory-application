const queries = require('../db/queries')

function addGet(req, res) {
    res.render("add/add", { title: "Add to Inventory" });
}

async function addEvidenceGet(req, res) {
    const cases = await queries.getAllCases();
    const types = await queries.getTypes();
    const owners = await queries.getOwners();
    res.render("add/addEvidence", { title: "Add Evidence", cases: cases, types: types, owners: owners });
}

function addOwnerGet(req, res) {
    res.render("add/addOwner", { title: "Add Owner" });
}

function addEvidenceTypeGet(req, res) {
    res.render("add/addEvidenceType", { title: "Add Evidence Type" })
}

async function addCaseGet(req, res) {
    const games = await queries.getGames();
    res.render("add/addCase", { title: "Add Case", games: games })
}

async function addEvidencePost(req, res) {
    const name = req.body.name;
    const description = req.body.description;
    const type = req.body.type;
    const owner = req.body.owner;
    const c = req.body.case;
    const image = req.body.imageUrl;
    await queries.addEvidence(name, description, type, c, owner, image);
    res.redirect("/add/evidence");
}

async function addEvidenceTypePost(req, res) {
    const name = req.body.name;
    await queries.addType(name);
    res.redirect("/add/type");
}

async function addOwnerPost(req, res) {
    const name = req.body.name;
    const occupation = req.body.occupation;
    const image = req.body.imageUrl;
    await queries.addOwner(name, occupation, image);
    res.redirect("/add/owner");
}

async function addCasePost(req, res) {
    const name = req.body.name;
    const game = req.body.game;
    await queries.addCase(name, game);
    res.redirect("/add/case");
}

module.exports = {
    addGet,
    addEvidenceGet,
    addOwnerGet,
    addEvidenceTypeGet,
    addCaseGet,
    addEvidencePost,
    addEvidenceTypePost,
    addOwnerPost,
    addCasePost
}