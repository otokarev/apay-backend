import { Test, TestingModule } from '@nestjs/testing';
import {RatesService} from "./rates.service";
import {HttpModule} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import configuration from "./config/configuration";
import {TypeOrmModule} from "@nestjs/typeorm";

describe('RatesService', () => {
  let ratesService: RatesService;
  let configService: ConfigService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [RatesService, ConfigService],
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: (config: ConfigService) => config.get('database'),
          inject: [ConfigService],
        }),
        HttpModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration]
        }),
      ],
    }).compile();

    ratesService = app.get<RatesService>(RatesService);
    configService = app.get<ConfigService>(ConfigService);
  });

  describe('RatesService', () => {
    it('fetch', async () => {
      expect(await ratesService.fetchRates()).toBe('TODO');
    });
  });
});
