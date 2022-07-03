import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LockCodeModule } from './lock-code/lockCode.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Carl:zEXw8WuXDD1TqZ9N@cluster0.hgf4z.mongodb.net/?retryWrites=true&w=majority',
    ),
    LockCodeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
