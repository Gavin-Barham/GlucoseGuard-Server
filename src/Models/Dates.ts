import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';
import { DATABASE as DB } from '../Database/Database.js';
import { Medical } from './Medical.js'
import { Nutrition } from './Nutrition.js'
import { Exercise } from './Exercise.js'

interface DatesAttributes {
    userId: number,
    id: number,
    date: Date,
    medicalId: number,
    nutritionId: number,
    exerciseId: number,
}


declare type DatesCreationAttributes = Optional<DatesAttributes, 'userId' | 'id' | 'medicalId' | 'nutritionId' | 'exerciseId'>;


const Dates: ModelDefined<DatesAttributes, DatesCreationAttributes> = 
DB.define(
    'Dates',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        medicalId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nutritionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        exerciseId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: 'Dates'
    },
);


// ASSOCIATED TABLES
Dates.hasMany(Medical, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'medical'
});
Medical.belongsTo(Dates, { targetKey: 'id' });

Dates.hasMany(Nutrition, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'nutrition'
});
Nutrition.belongsTo(Dates, { targetKey: 'id' });

Dates.hasMany(Exercise, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'exercise'
});
Exercise.belongsTo(Dates, { targetKey: 'id' });


export { Dates }