import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LockCodeDocument = LockCode & Document;

@Schema()
export class LockCode {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  timeSet: number;
}

export const LockCodeSchema = SchemaFactory.createForClass(LockCode);
