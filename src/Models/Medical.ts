import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';
import { DATABASE as DB } from '../Database/Database.js';
import { Users } from '../Models/Users.js';
import { Medication, BloodPressure } from '../Types/models.js'

interface MedicalAttributes {
    userId: number,
    id: number,
    oxygen: string,
    heartRate: number[],
    bloodPressure: BloodPressure,
    bloodGlucose: number[],
    medication: Medication,
};


declare type MedicalCreationAttributes = Optional<MedicalAttributes, 'userId' | 'oxygen' | 'heartRate' | 'bloodPressure' | 'bloodGlucose' | 'medication'>;


const Medical: ModelDefined<MedicalAttributes, MedicalCreationAttributes> = 
DB.define(
    'Medical',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        oxygen: {
            type: DataTypes.STRING,
            allowNull: true
        },
        heart_rate: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        blood_pressure: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        blood_glucose: {
            type: DataTypes.JSON,
            allowNull: true
        },
        medication: {
            type: DataTypes.JSON,
            allowNull: true,
        }
    },
    {
        tableName: 'Medical'
    },
);

export { Medical }