const queries = require('../db/queries')

async function browseGet(req, res) {
    res.render("browse/browse", { title: "Browse" });
}

async function browseTypesGet(req, res) {
    const types = await queries.getTypes();
    const evidences = await queries.getEvidences();
    res.render("browse/browseTypes", { title: "Browse by Types", types: types });
}

async function browseTypeGet(req, res) {
    const typeId = req.params.typeId;
    const type = await queries.getType(typeId);
    const evidences = await queries.getTypeEvidence(typeId);
    res.render("browse/browseType", { title: type[0].name, type: type[0], evidences: evidences });
}

async function browseTypeDeletePost(req, res) {
    const typeId = req.body.typeId;
    try {
        await queries.deleteType(typeId);
        res.redirect("/browse/types");
    } catch (error) {
        if (error.code == '23503') {
            return res.send(`
                <script>
                    alert("Must empty all evidences first!");
                    window.history.back();
                </script>
            `);
        }
    }
}

async function typeEditGet(req, res) {
    const typeId = req.params.typeId;
    const type = await queries.getType(typeId);
    res.render("browse/typeEdit", { title: "Edit Type", type: type[0] });
}

async function typeEditPost(req, res) {
    const typeId = req.params.typeId;
    await queries.editType(typeId, req.body.name);
    res.redirect(`/browse/types/${typeId}`);
}

async function browseGamesGet(req, res) {
    const games = await queries.getGames();
    const evidences = await queries.getEvidences();
    res.render("browse/browseGames", { title: "Browse by Games", games: games });
}

async function browseGameGet(req, res) {
    const gameId = req.params.gameId;
    const game = await queries.getGame(gameId);
    const cases = await queries.getCases(gameId);
    const evidences = await queries.getGameEvidence(gameId);
    res.render("browse/browseGame", { title: game[0].name, game: game[0], cases: cases, evidences: evidences });
}

async function browseCaseGet(req, res) {
    const caseId = req.params.caseId;
    const gameCase = await queries.getCase(caseId);
    const evidences = await queries.getCaseEvidence(caseId);
    res.render("browse/browseCase", { title: gameCase[0].name, gameCase: gameCase[0], evidences: evidences });
}

async function browseCaseDeletePost(req, res) {
    const caseId = req.body.caseId;
    try {
        await queries.deleteCase(caseId);
        res.redirect("/browse/games");
    } catch (error) {
        if (error.code == '23503') {
            return res.send(`
                <script>
                    alert("Must empty all evidences first!");
                    window.history.back();
                </script>
            `);
        }
    }
}

async function caseEditGet(req, res) {
    const caseId = req.params.caseId;
    const gameCase = await queries.getCase(caseId);
    const games = await queries.getGames();
    res.render("browse/caseEdit", { title: "Edit Case", gameCase: gameCase[0], games: games });
}

async function caseEditPost(req, res) {
    const caseId = req.params.caseId;
    await queries.editCase(caseId, req.body.name, req.body.game);
    res.redirect(`/browse/games/${req.body.game}`);
}

module.exports = {
    browseGet,
    browseTypesGet,
    browseTypeGet,
    browseTypeDeletePost,
    typeEditGet,
    typeEditPost,
    browseGamesGet,
    browseGameGet,
    browseCaseGet,
    browseCaseDeletePost,
    caseEditGet,
    caseEditPost
}