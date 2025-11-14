import { EntityManager } from "typeorm";
import AppDataSource from "../config/db.config";

async function runInTransaction<T>(
  callback: (manager: EntityManager) => Promise<T>
): Promise<T> {
  return await AppDataSource.transaction(async (transactionalEntityManager) => {
    return await callback(transactionalEntityManager);
  });
}

export default runInTransaction;