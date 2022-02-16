import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/main.mjs";
// import minio from "./minio/main.mjs";
// import websockets from './ws/index.mjs';

export default class api {
    app = null;
    config = null;
    constructor(config, sequelize) {
        this.config = config;
        this.app = express();
        this.app.use(cors());
        this.app.use(express.static("public"));
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
        this.app.use(function (req, res, next) {
            req.sequelize = sequelize;
            // req.minio = minio();
            next();
        });
        this.app.use("/", routes);
    }
    start = () => {
        const server = this.app.listen(this.config.app.port, () => {
            console.log(`App listening at http://localhost:${this.config.app.port}`);
        });
        // websockets(server);

        // process.on("message", (message) => {
        //     console.log(message);
        // });
    }
}
