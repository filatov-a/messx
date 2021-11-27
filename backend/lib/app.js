const config = require("./config/config");
const api = require("./api/api");

class App {
    config = null;
    api = null

    constructor() {
        this.config = config;
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
