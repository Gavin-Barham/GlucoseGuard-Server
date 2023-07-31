import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';
import { DATABASE as DB } from '../Database/Database.js';
import { CalsBurned, Sleep } from '../Types/models.js'

interface ExerciseAttributes {
    userId: number,
    id: number,
    weight: number,
    dailySteps: number,
    miles: number,
    calsBurned: CalsBurned,
    sleep: Sleep
}


declare type ExerciseCreationAttributes = Optional<ExerciseAttributes, 'userId' | 'weight' | 'dailySteps' | 'miles' | 'calsBurned' | 'sleep'>;


const Exercise: ModelDefined<ExerciseAttributes, ExerciseCreationAttributes> = 
DB.define(
    'Exercise',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        daily_steps: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        miles: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        cals_burned: {
            type: DataTypes.JSON,
            allowNull: true
        },
        sleep: {
            type: DataTypes.JSON,
            allowNull: true
        }
    },
    {
        tableName: 'Exercise'
    },
);

export { Exercise }