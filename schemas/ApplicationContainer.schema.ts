import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { LockCode } from './LockCode.schema';

export type ApplicationContainerDocument = ApplicationContainer & Document;

@Schema()
export class ApplicationContainer {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LatestLockCode',
    require: false,
  })
  LatestLockCode: LockCode;
}

export const ApplicationContainerSchema =
  SchemaFactory.createForClass(ApplicationContainer);
