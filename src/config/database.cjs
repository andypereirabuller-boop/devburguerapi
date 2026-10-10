const databaseConfig = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};


const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY; 


module.exports = {
  databaseConfig,
  STRIPE_SECRET_KEY
};
