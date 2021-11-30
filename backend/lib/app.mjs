import config from './config/config.cjs';
import api from './api/api.mjs';
import db from './models/index.mjs';

export default class App {
    config = null;

    api = null

    sequelize = null;

    constructor() {
        this.config = config;
        this.db = new db(this.config);
        this.sequelize = this.db.init();
        this.api = new api(this.config);
    }

    appStart = () => {
        this.api.start();
    }

    static create = () => {
        return new this();
    }
}
