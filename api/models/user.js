const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    is_email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull : true,
        defaultValue : false
    },
    verification_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    token_expiry: {
        type: DataTypes.DATE,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "user"
    }
    },{
        timestamps: false,
        tableName: "users"
    }
);
module.exports = User;