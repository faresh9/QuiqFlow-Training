import { Sequelize, Transaction } from 'sequelize';
import { logger } from './logger.js';

type TransactionCallback<T> = (transaction: Transaction) => Promise<T>;

export async function withTransaction<T>(
  sequelize: Sequelize,
  callback: TransactionCallback<T>
): Promise<T> {
  const transaction = await sequelize.transaction();

  try {
    const result = await callback(transaction);
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    logger.error('Transaction failed:');
    throw error;
  }
}
