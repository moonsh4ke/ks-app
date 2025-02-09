import { config, list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text } from '@keystone-6/core/fields';

/* if (process.env.NODE_ENV === 'test') {
  configDotenv({path: './second.env'});
  console.log(process.env.PSQL_URI);
} else {
  configDotenv();
} */

export default config({
  db: {
    provider: 'postgresql',
    url: process.env.PSQL_URI!,
  },
  lists: {
    User: list({
      access: allowAll,
      fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      },
    }),
  },
});