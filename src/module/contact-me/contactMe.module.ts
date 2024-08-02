import { Module } from '@nestjs/common';
import { DB_COLLECTION } from 'src/common/mongoDB';
import { MongooseModule } from '@nestjs/mongoose';

import { ContactMe, ContactMeSchema } from './schemas/contactMe.schema';
import { ContactMeService } from './contactMe.service';
import { ContactMeController } from './contactMe.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ContactMe.name,
        schema: ContactMeSchema,
        collection: DB_COLLECTION.ContactMe,
      },
    ]),
  ],
  controllers: [ContactMeController],
  providers: [ContactMeService],
})
export class ContactMeModule {}
