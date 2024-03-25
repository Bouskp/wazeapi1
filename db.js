import { Sequelize } from 'sequelize'
import { config } from 'dotenv'

config()
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: 'mariadb',
    host: 'localhost',
    port: 3306,
  }
)

export default sequelize
