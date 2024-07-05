import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DataBaseName } from './common/mongoDB';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
      ignoreEnvFile: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://hodiencong2000:diencong12c5@tc-store-admin.mpkyxqj.mongodb.net/?retryWrites=true&w=majority&appName=tc-store-admin`,
      {
        dbName: DataBaseName,
        enableUtf8Validation: true,
        pass: process.env.PASSWORD_MONGO,
        user: process.env.USER_NAME_MONGO,
      },
    ),
  ],
})
export class AppModule {}
