import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';
import { DATABASE as DB } from '../Database/Database.js';
import { Meal } from '../Types/models.js'

interface NutritionAttributes {
    userId: number;
    id: number,
    breakfast: Meal
    lunch: Meal
    dinner: Meal
    snacks: Meal
}


declare type NutritionCreationAttributes = Optional<NutritionAttributes, 'userId' | 'breakfast' | 'lunch' | 'dinner' | 'snacks'>;


const Nutrition: ModelDefined<NutritionAttributes, NutritionCreationAttributes> = 
DB.define(
    'Nutrition',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        breakfast: { 
            type: DataTypes.JSON,
            allowNull: true,
        },
        lunch: { 
            type: DataTypes.JSON,
            allowNull: true,
        },
        dinner: { 
            type: DataTypes.JSON,
            allowNull: true,
        },
        snacks: { 
            type: DataTypes.JSON,
            allowNull: true,
        },
    },
    {
        tableName: 'Nutrition',
    },
);

export { Nutrition }