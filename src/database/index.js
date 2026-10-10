import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import Category from '../app/models/Category.js';
import Product from '../app/models/Product.js';
import User from '../app/models/User.js';
import config from '../config/database.cjs'; // Mudamos o nome da importação para evitar confusão

// CORREÇÃO: Pegar especificamente a propriedade databaseConfig de dentro do arquivo
const sequelizeConfig = config?.default?.databaseConfig ?? config.databaseConfig;

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(sequelizeConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      );
  }
  mongo() {
    this.mongoConnection = mongoose.connect(
      process.env.MONGO_URL,
    );
  }
}

export default new Database();
