const queries = require('../db/queries')

function indexGet(req, res) {
    res.render("index", { title: "Court Inventory" });
}

async function evidencesGet(req, res) {
    const evidences = await queries.getEvidences();
    res.render("evidences", { title: "Evidences", evidences: evidences })
}

async function evidenceGet(req, res) {
    const evidenceId = req.params.evidenceId;
    const evidence = await queries.getEvidence(evidenceId);
    res.render("evidenceDetail", { title: evidence[0].evidence_name, evidence: evidence[0] })
}

async function evidenceDeletePost(req, res) {
    const evidenceId = req.body.evidenceId;
    await queries.deleteEvidence(evidenceId);
    res.redirect("/evidences");
}

async function evidenceEditGet(req, res) {
    const evidenceId = req.params.evidenceId;
    const evidence = await queries.getEvidence(evidenceId);
    const cases = await queries.getAllCases();
    const types = await queries.getTypes();
    const owners = await queries.getOwners();
    res.render("evidenceEdit", { title: "Edit Evidence", evidence: evidence[0], cases: cases, types: types, owners: owners })
}

async function evidenceEditPost(req, res) {
    const evidenceId = req.params.evidenceId;
    await queries.editEvidence(evidenceId, req.body.name, req.body.description, req.body.type, req.body.case, req.body.owner, req.body.imageUrl);
    res.redirect(`/evidences/${evidenceId}`);
}

module.exports = {
    indexGet,
    evidencesGet,
    evidenceGet,
    evidenceDeletePost,
    evidenceEditGet,
    evidenceEditPost
}