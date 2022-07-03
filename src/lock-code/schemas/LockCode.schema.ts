import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApplicationContainer } from './ApplicationContainer.schema';

export type LockCodeDocument = LockCode & Document;

@Schema()
export class LockCode {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  creationTimestamp: number;

  @Prop({ required: true })
  finishTimestamp: number;
}

export const LockCodeSchema = SchemaFactory.createForClass(LockCode);
