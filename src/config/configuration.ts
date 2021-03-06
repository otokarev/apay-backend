import { Networks } from 'stellar-sdk';
import * as fs from 'fs';
export default () => ({
  apayBaseUrl: 'https://api.apay.io/api',
  swapAccount: process.env.SWAP_ACCOUNT,
  swapAccountSecret: process.env.SWAP_ACCOUNT_SECRET,
  channelAccounts: [
    'GBXLPL5SYAYBMIEGYBGYNAXVDTFSBOVCFHS3DR7BPBI7E7ORUTT6C4ST',
    'GDIO536MUORCLTHRWNAWITLAH3T6QUZWVEPHVJRTHECX6VH2LYRGP3YY',
  ],
  nomicsApiKey: process.env.NOMICS_API_KEY,
  ratesFetcherInterval: process.env.RATES_FETCHER_INTERVAL || 60 * 60 * 1000, // 1hr
  database: {
    type: process.env.TYPEORM_TYPE || 'postgres',
    url: process.env.TYPEORM_URL || process.env.DATABASE_URL ,
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    ssl: process.env.TYPEORM_SSL ? {
      rejectUnauthorized: true,
      ca: fs.readFileSync('/app/postgres.crt').toString(),
    } : null,
    database: process.env.TYPEORM_DATABASE,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    logging: process.env.TYPEORM_LOGGING === 'true',
    entities: (process.env.TYPEORM_ENTITIES || 'dist/**/**.entity{.ts,.js}').split(';'),
    migrationsRun: (process.env.TYPEORM_MIGRATIONS_RUN || 'true')=== 'true',
    synchronize: (process.env.TYPEORM_SYNCHRONIZE || 'true') === 'true',
    extra: process.env.TYPEORM_SOCKET ? {host: process.env.TYPEORM_SOCKET} : null,
  },
  logger: {
    level: process.env.LOG_LEVEL || 'info',
  },
  fluentd: {
    enabled: process.env.FLUENTD_ENABLED || false,
    host: process.env.FLUENTD_TAG_PREFIX || 'localhost',
    port: +process.env.FLUENTD_PORT || 24224,
    tagPrefix: process.env.FLUENTD_TAG_PREFIX || 'apay',
  },
  stellar: {
    horizonUrl: process.env.STELLAR_HORIZON_URL || 'https://horizon-testnet.stellar.org',
    networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE || Networks.TESTNET,
    knownIssuers: {
      XLM: null,
      BTC: 'GAUTUYY2THLF7SGITDFMXJVYH3LHDSMGEAKSBU267M2K7A3W543CKUEF',
      USDT: 'GCQTGZQQ5G4PTM2GL7CDIFKUBIPEC52BROAQIAPW53XBRJVN6ZJVTG6V',
      LTC: 'GC5LOR3BK6KIOK7GKAUD5EGHQCMFOGHJTC7I3ELB66PTDFXORC2VM5LP',
      ETH: 'GBDEVU63Y6NTHJQQZIKVTC23NWLQVP3WJ2RI2OTSJTNYOIGICST6DUXR',
      BAT: 'GBDEVU63Y6NTHJQQZIKVTC23NWLQVP3WJ2RI2OTSJTNYOIGICST6DUXR',
      LINK: 'GBDEVU63Y6NTHJQQZIKVTC23NWLQVP3WJ2RI2OTSJTNYOIGICST6DUXR',
      OMG: 'GBDEVU63Y6NTHJQQZIKVTC23NWLQVP3WJ2RI2OTSJTNYOIGICST6DUXR',
      REP: 'GBDEVU63Y6NTHJQQZIKVTC23NWLQVP3WJ2RI2OTSJTNYOIGICST6DUXR',
      ZRX: 'GBDEVU63Y6NTHJQQZIKVTC23NWLQVP3WJ2RI2OTSJTNYOIGICST6DUXR',
      KIN: 'GBDEVU63Y6NTHJQQZIKVTC23NWLQVP3WJ2RI2OTSJTNYOIGICST6DUXR',
    },
  },
  redis: process.env.REDIS || {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASS || '',
    keepAlive: 15000,
  },
});
