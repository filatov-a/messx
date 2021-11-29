const config = require("./config/config");
const api = require("./api/api");
const db = require("./models/index");

class App {
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
        return new this;
    }
}

module.exports = App;
