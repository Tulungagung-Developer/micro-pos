import { EntityManager } from 'typeorm';
import { DataSource } from '@lib/typeorm/data-source.typeorm';

export const Connector = async <T>(
  callback: (entityManager: EntityManager) => Promise<T>,
  manager?: EntityManager,
): Promise<T> => {
  if (manager) return callback(manager);
  return DataSource.transaction(async (entityManager) => callback(entityManager));
};
