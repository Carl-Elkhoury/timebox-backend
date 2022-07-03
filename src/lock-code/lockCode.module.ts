import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LockCodeController } from './lockCode.controller';
import { LockCodeService } from './lockCode.service';
import {
  ApplicationContainer,
  ApplicationContainerSchema,
} from './schemas/ApplicationContainer.schema';
import { LockCode, LockCodeSchema } from './schemas/LockCode.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LockCode.name, schema: LockCodeSchema },
      { name: ApplicationContainer.name, schema: ApplicationContainerSchema },
    ]),
  ],
  controllers: [LockCodeController],
  providers: [LockCodeService],
})
export class LockCodeModule {}
