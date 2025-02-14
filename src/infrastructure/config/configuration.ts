export default (): Record<string, unknown> => ({
  port: process.env.PORT,
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: true,
  },
  orm: {
    autoLoadEntities: true,
    synchronize: true,
  },
});
