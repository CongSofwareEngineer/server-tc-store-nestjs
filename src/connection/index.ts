import * as mongoose from 'mongoose';
import { urlConnectMongo } from 'src/common/mongoDB';
export const databaseProviders = [
  {
    provide: 'tc-store',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(urlConnectMongo),
  },
];
