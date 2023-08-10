import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import 'dotenv/config'

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: ['dist/src/entities/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}']
}

const dataSource = new DataSource(typeORMConfig as DataSourceOptions)

export default dataSource