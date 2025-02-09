import { resetDatabase } from '@keystone-6/core/testing';
import path from 'path';

const prismaSchemaPath = path.join(path.resolve(__dirname, '..'), 'schema.prisma');

beforeEach(async () => {
  await resetDatabase(global.dbUrl, prismaSchemaPath);
});