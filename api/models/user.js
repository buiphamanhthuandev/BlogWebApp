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
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "user"
    },
    refresh_token:{
        type: DataTypes.STRING,
        allowNull: true
    }
    },{
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableName: "users",

        defaultScope: {
            attributes: {
                exclude: [
                    "password",
                    "refresh_token",
                    "verification_token",
                    "token_expiry"
                ]
            }
        },
        scopes: {
            withAllData:{
                attributes: {}
            }
        }
    }
);
module.exports = User;