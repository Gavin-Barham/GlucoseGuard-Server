import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
  Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';
import { DATABASE as DB } from '../Database/Database.js';
import { Dates } from './Dates.js'


interface UserAttributes {
  id: number,
  username: string,
  email: string,
  password: string,
  height: number,
  targetCal: string,
  refreshToken: string,
}

type UserCreationAttributes = Optional<UserAttributes, 'username' | 'email' | 'password' | 'height' | 'targetCal' | 'refreshToken'>;


const Users: ModelDefined<UserAttributes, UserCreationAttributes> = 
DB.define(
    'Users',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        target_cal: {
            type: DataTypes.STRING,
            allowNull: true
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'Users'
    },
);


// ASSOCIATED TABLES
Users.hasMany(Dates, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'dates'
})
Dates.belongsTo(Users, {
  targetKey: 'id',
})


export { Users }