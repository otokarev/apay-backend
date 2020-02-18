import {Injectable} from '@nestjs/common';
import {getRepository, Repository, SelectQueryBuilder} from "typeorm";
import {AbstractService} from "./abstract.service";
import {InjectRepository} from "@nestjs/typeorm";
import {OrderOption} from "./app.enums";
import {MyLoggerService} from "./my-logger.service";
import {DailyBalance} from "./entities/daily-balance.entity";
import {GetDailyBalancesDto} from "./dto/get-daily-balances.dto";

@Injectable()
export class DailyBalanceService extends AbstractService<GetDailyBalancesDto, DailyBalance, DailyBalance> {
  private readonly logger = new MyLoggerService(DailyBalanceService.name);
  constructor(
    @InjectRepository(DailyBalance)
    protected readonly entitiesRepository: Repository<DailyBalance>,
  ) {
    super();
  }

  getItemsBuilder(input: GetDailyBalancesDto, repository?: Repository<DailyBalance>): SelectQueryBuilder<any> {
    const builder = (repository || getRepository(DailyBalance)).createQueryBuilder('daily_balance').where('true');
    const order = input.order || {field: 'cursor', order: OrderOption.ASC};

    builder.orderBy('daily_balance.' + order.field, order.order);

    if (input.cursor) {
      const sign = order.order === OrderOption.ASC ? '>' : '<';
      switch (true) {
        case order.field === 'cursor':
          builder.andWhere(`daily_balance.cursor ${sign} :cursor`, {cursor: +input.cursor});
          break;
        case ['date', 'createdAt'].includes(order.field):
          builder.andWhere(`daily_balance.${order.field}Cursor ${sign} :cursor`, {cursor: input.cursor});
          break;
      }
    }

    if (input.createdAt) {
      builder.andWhere('daily_balance.createdAt = :value', { value: input.createdAt });
    }

    if (input.fromCreatedAt) {
      builder.andWhere('daily_balance.createdAt >= :value', { value: input.fromCreatedAt });
    }

    if (input.toCreatedAt) {
      builder.andWhere('daily_balance.createdAt <= :value', { value: input.toCreatedAt });
    }

    if (input.date) {
      builder.andWhere('daily_balance.date = :value', { value: input.date });
    }

    if (input.fromDate) {
      builder.andWhere('daily_balance.date >= :value', { value: input.fromDate });
    }

    if (input.toDate) {
      builder.andWhere('daily_balance.date <= :value', { value: input.toDate });
    }

    if (input.id) {
      builder.andWhere('daily_balance.id = :id', { id: input.id });
    }

    return builder;
  }

  async upsertDailyBalance(balance) {
    return getRepository(DailyBalance)
      .createQueryBuilder()
      .insert()
      .into(DailyBalance)
      .values(balance)
      .onConflict(`ON CONSTRAINT "UQ_accountId_asset_date" DO UPDATE SET "amount" = :amount`)
      .setParameters({
        amount: balance.amount.toString(),
      })
      .execute()
      .then((result) => {
        return this.findOne({id: result.identifiers[0].id});
      })
      .then((balance) => {
        balance.dateCursor = this.generateDateCursor(balance.date, balance.cursor);
        balance.createdAtCursor = this.generateDateCursor(balance.createdAt, balance.cursor);
        return this.entitiesRepository.save(balance);
      });
  }
}