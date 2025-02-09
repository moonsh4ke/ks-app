import { getContext } from '@keystone-6/core/context';
import * as PrismaModule from '.prisma/client';
import baseConfig from '../keystone';

const config = { ...baseConfig, db: { ...baseConfig.db, url: global.dbUrl } };

const context = getContext(config, PrismaModule);

test('Your unit test', async () => {
  // ...
  const user = await context.query.User.createOne(
    {
      data: { name: "Panchi", email: "panchi@mail.com"},
      query: 'id name email',
    }
  )

  expect(user.name).toEqual('Odie');
  expect(user.email).toEqual('odie@mail.com');
});
