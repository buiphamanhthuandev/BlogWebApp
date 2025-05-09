const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Contact = sequelize.define("Contact", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    state: {
        type: DataTypes.TINYINT,
        defaultValue : 1,
        allowNull: true,
    }
},{
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    tableName: "contacts"
});

module.exports = Contact;