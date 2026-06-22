const queries = require('../db/queries')

async function ownersGet(req, res) {
    const owners = await queries.getOwners();
    res.render("owners", { title: "Owners", owners: owners });
}

async function ownerGet(req, res) {
    const ownerId = req.params.ownerId;
    const owner = await queries.getOwner(ownerId);
    const evidences = await queries.getOwnerEvidences(ownerId)
    res.render("owner", { title: owner[0].name, owner: owner[0], evidences: evidences })
}

async function ownerDeletePost(req, res) {
    const ownerId = req.body.ownerId;
    try {
        await queries.deleteOwner(ownerId);
        res.redirect("/owners");
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

async function ownerEditGet(req, res) {
    const ownerId = req.params.ownerId;
    const owner = await queries.getOwner(ownerId);
    res.render("ownerEdit", { title: "Edit Owner", owner: owner[0] })
}

async function ownerEditPost(req, res) {
    const ownerId = req.params.ownerId;
    await queries.editOwner(ownerId, req.body.name, req.body.occupation, req.body.imageUrl);
    res.redirect(`/owners/${ownerId}`)
}

module.exports = {
    ownersGet,
    ownerGet,
    ownerDeletePost,
    ownerEditGet,
    ownerEditPost
}