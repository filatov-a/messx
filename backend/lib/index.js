const express = require("express");
const cors = require("cors");

const app = express();

const bodyParser = require("body-parser");
const config = require("./config/config");
const routes = require("./routes/main.js");

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/", routes);

app.listen(config.app.port, () => {
	console.log(`App listening at http://localhost:${config.app.port}`);
});
