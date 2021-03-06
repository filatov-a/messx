import config from './config/config.cjs';
import api from './api/api.mjs';
import db from './models/index.mjs';
import sequelize from "sequelize";

export default class App {
    config = null;

    api = null

    sequelize = null;

    constructor() {
        this.config = config;
        this.db = new db(config);
        this.sequelize = this.db.init();
        this.api = new api(config, sequelize);
    }

    appStart = () => {
        this.api.start();
    }

    static create = () => {
        return new this();
    }
}
