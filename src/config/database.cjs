const databaseConfig = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAMME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

// ⚠️ ATENÇÃO: Substitua a chave abaixo pela sua chave SECRETA (sk_test_... ou sk_live_...)
process.env.STRIPE_SECRET_KEY


module.exports = {
  databaseConfig,
  STRIPE_SECRET_KEY
};
