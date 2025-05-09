const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const Subscribe = sequelize.define("Subscribe", {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    tableName: "subscriptions"
});

module.exports = Subscribe;