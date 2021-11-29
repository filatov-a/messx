import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/main.mjs";

export default class api {
    app = null;
    config = null;
    constructor(config, db) {
        this.config = config;
        this.app = express();
        this.app.use(cors());
        this.app.use(express.static("public"));
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
        this.app.use("/", routes);
    }
    start = () => {
        this.app.listen(this.config.app.port, () => {
            console.log(`App listening at http://localhost:${this.config.app.port}`);
        });
    }
}
