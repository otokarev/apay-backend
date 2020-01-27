export default () => ({
  nomicsApiKey: process.env.NOMICS_API_KEY,
  database: {
    type: process.env.TYPEORM_TYPE || 'postgres',
    url: process.env.TYPEORM_URL || process.env.DATABASE_URL ,
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    logging: process.env.TYPEORM_LOGGING === 'true',
    entities: (process.env.TYPEORM_ENTITIES || 'dist/**/**.entity{.ts,.js}').split(';'),
    migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
    synchronize: (process.env.TYPEORM_SYNCHRONIZE || 'true') === 'true',
    extra: process.env.TYPEORM_SOCKET ? {host: process.env.TYPEORM_SOCKET} : null,
  }
});