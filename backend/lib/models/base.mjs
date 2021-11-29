import Sequelize from 'sequelize';

export default class Base extends Sequelize.Model {
    static DT = Sequelize.DataTypes;
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
