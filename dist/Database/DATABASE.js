import { Sequelize } from 'sequelize';
const DATABASE = new Sequelize(process.env.DB || "", process.env.DB_USER || "", process.env.DB_PASS || "", {
    host: process.env.DB_HOST || "",
    dialect: 'postgres'
});
export { DATABASE };
//# sourceMappingURL=DATABASE.js.map