module.exports = {
  development: {
      connectionString: process.env.DATABASE_URL,
      dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
      },
  },
  production: {
      use_env_variable: "DATABASE_URL",
      dialectOptions: {
          ssl: {
              require: true,
              rejectUnauthorized: false,
          },
      },
  },
};
