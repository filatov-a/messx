const Sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

class Base extends Sequelize.Model {
    static DT = DataTypes;
    static init(sequelize, options = {}) {
        super.init(this.modelSchema, {
            modelName : this.modelName,
            ...options,
            sequelize,
            ...this.options
        });
    }

    static initAssociateAndHooks(models) {
        if (this.associate) this.associate(models);
        // if (this.initHooks) this.initHooks();
    }
}

module.exports = Base
