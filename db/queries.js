const pool = require("./pool");

async function getEvidences() {
    const { rows } = await pool.query("SELECT id, name, image_url FROM evidences ORDER BY id ASC");
    return rows;
}

async function getEvidence(id) {
    const { rows } = await pool.query("SELECT e.id AS evidence_id, e.name AS evidence_name, e.description, e.image_url, t.id AS type_id, t.name AS type_name, c.name AS case_name, o.name AS owner_name, g.name AS game_name FROM evidence_types AS t JOIN evidences AS e ON t.id = e.type_id JOIN cases AS c ON e.case_id = c.id JOIN owners AS o ON e.owner_id = o.id JOIN games AS g ON c.game_id = g.id WHERE e.id = $1", [id]);
    return rows;
}

async function addEvidence(name, description, type_id, case_id, owner_id, image_url) {
    await pool.query("INSERT INTO evidences (name, description, type_id, case_id, owner_id, image_url) VALUES ($1, $2, $3, $4, $5, $6)", [name, description, type_id, case_id, owner_id, image_url]);
}

async function deleteEvidence(id) {
    await pool.query("DELETE FROM evidences WHERE id = $1", [id]);
}

async function editEvidence(id, name, description, type_id, case_id, owner_id, image_url) {
    await pool.query("UPDATE evidences SET name = $1, description = $2, type_id = $3, case_id = $4, owner_id = $5, image_url = $6 WHERE id = $7", [name, description, type_id, case_id, owner_id, image_url, id]);
}

async function getOwners() {
    const { rows } = await pool.query("SELECT * FROM owners ORDER BY id ASC");
    return rows;
}

async function getOwner(id) {
    const { rows } = await pool.query("SELECT * FROM owners WHERE id = $1", [id]);
    return rows;
}

async function getOwnerEvidences(id) {
    const { rows } = await pool.query("SELECT * FROM evidences WHERE owner_id = $1 ORDER BY id ASC", [id]);
    return rows;
}

async function addOwner(name, occupation, image_url) {
    await pool.query("INSERT INTO owners (name, occupation) VALUES ($1, $2)", [name, occupation, image_url]);
}

async function deleteOwner(id) {
    await pool.query("DELETE FROM owners WHERE id = $1", [id]);
}

async function editOwner(id, name, occupation, image_url) {
    await pool.query("UPDATE owners SET name = $1, occupation = $2, image_url = $3 WHERE id = $4", [name, occupation, image_url, id]);
}

async function getTypes() {
    const { rows } = await pool.query("SELECT * FROM evidence_types ORDER BY id ASC");
    return rows;
}

async function getType(id) {
    const { rows } = await pool.query("SELECT * FROM evidence_types WHERE id = $1", [id]);
    return rows;
}

async function getTypeEvidence(id) {
    const { rows } = await pool.query("SELECT * FROM evidences WHERE type_id = $1 ORDER BY id ASC", [id]);
    return rows;
}

async function addType(name) {
    await pool.query("INSERT INTO evidence_types (name) VALUES ($1)", [name]);
}

async function deleteType(id) {
    await pool.query("DELETE FROM evidence_types WHERE id = $1", [id]);
}

async function editType(id, name) {
    await pool.query("UPDATE evidence_types SET name = $1 WHERE id = $2", [name, id]);
}

async function getCases(gameId) {
    const { rows } = await pool.query("SELECT * FROM cases WHERE game_id = $1 ORDER BY id ASC", [gameId]);
    return rows;
}

async function getAllCases() {
    const { rows } = await pool.query("SELECT * FROM cases ORDER BY id ASC");
    return rows;
}

async function getCase(id) {
    const { rows } = await pool.query("SELECT * FROM cases WHERE id = $1", [id]);
    return rows;
}

async function getCaseEvidence(id) {
    const { rows } = await pool.query("SELECT * FROM evidences WHERE case_id = $1 ORDER BY id ASC", [id]);
    return rows;
}

async function addCase(name, game_id) {
    await pool.query("INSERT INTO cases (name, game_id) VALUES ($1, $2)", [name, game_id]);
}

async function deleteCase(id) {
    await pool.query("DELETE FROM cases WHERE id = $1", [id]);
}

async function editCase(id, name, game_id) {
    await pool.query("UPDATE cases SET name = $1, game_id = $2 WHERE id = $3", [name, game_id, id]);
}

async function getGames() {
    const { rows } = await pool.query("SELECT * FROM games ORDER BY id ASC");
    return rows;
}

async function getGame(id) {
    const { rows } = await pool.query("SELECT * FROM games WHERE id = $1", [id]);
    return rows;
}   

async function getGameEvidence(id) {
    const { rows } = await pool.query("SELECT evidences.name, evidences.image_url from evidences JOIN cases ON evidences.case_id = cases.id WHERE cases.game_id = $1 ORDER BY evidences.id ASC", [id]);
    return rows;
}



module.exports = {
    getEvidences,
    getEvidence,
    addEvidence,
    deleteEvidence,
    editEvidence,
    getOwners,
    getOwner,
    getOwnerEvidences,
    addOwner,
    deleteOwner,
    editOwner,
    getTypes,
    getType,
    getTypeEvidence,
    addType,
    deleteType,
    editType,
    getCases,
    getAllCases,
    getCase,
    getCaseEvidence,
    addCase,
    deleteCase,
    editCase,
    getGames,
    getGame,
    getGameEvidence
}