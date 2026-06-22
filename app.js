const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const addRouter = require("./routes/addRouter");
const ownersRouter = require("./routes/ownersRouter")
const browseRouter = require("./routes/browseRouter")
const path = require("node:path");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/browse", browseRouter);
app.use("/add", addRouter);
app.use("/owners", ownersRouter);

const PORT = 8080;
app.listen(PORT, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) {
    throw error;
  }
  console.log(`Inventory Application - listening on port ${PORT}!`);
});