import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LockCode, LockCodeDocument } from './schemas/lockCode.schema';
import {
  ApplicationContainer,
  ApplicationContainerDocument,
} from './schemas/ApplicationContainer.schema';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class LockCodeService {
  constructor(
    @InjectModel(LockCode.name) private lockCodeModel: Model<LockCodeDocument>,
    @InjectModel(ApplicationContainer.name)
    private applicationContainerModel: Model<ApplicationContainerDocument>,
  ) {}

  async getContainer(): Promise<ApplicationContainerDocument> {
    let container = await this.applicationContainerModel
      .findOne()
      .populate('latestLockCode')
      .sort({ updated: -1 })
      .limit(1)
      .exec();
    if (container === null) {
      container = new this.applicationContainerModel();
      return container.save();
    }
    return container;
  }

  async create(finishTimestamp?: number): Promise<LockCode> {
    const container = await this.getContainer();
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    if (finishTimestamp == undefined) {
      finishTimestamp = timestamp +  604800000;
    }
    const code = Math.floor(Math.random() * 10000) + '';
    const encryptedCode = CryptoJS.AES.encrypt(
      code,
      'Secret Passphrase',
    ).toString();
    const createdLockCode = new this.lockCodeModel({
      code: encryptedCode,
      creationTimestamp: timestamp,
      finishTimestamp,
    });
    container.latestLockCode = createdLockCode;
    await Promise.all([container.save(), createdLockCode.save()]);
    createdLockCode.code = code;
    return createdLockCode;
  }

  async findAll(): Promise<LockCode[]> {
    const lockCodes = await this.lockCodeModel
      .find()
      .sort({ creationTimestamp: -1 })
      .exec();
    return this._decryptLockCodes(lockCodes);
  }

  _decryptLockCode(lockCode: LockCode): LockCode {
    lockCode.code = CryptoJS.AES.decrypt(
      lockCode.code,
      'Secret Passphrase',
    ).toString(CryptoJS.enc.Utf8);
    return lockCode;
  }

  _decryptLockCodes(lockCodes: LockCode[]): LockCode[] {
    return lockCodes.map((lockCode) => this._decryptLockCode(lockCode));
  }

  async getAllExpiredCodes(): Promise<LockCode[]> {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const lockCodes = await this.lockCodeModel
      .find()
      .where('finishTimestamp')
      .lte(timestamp)
      .sort({ creationTimestamp: -1 })
      .exec();
    return this._decryptLockCodes(lockCodes);
  }
}
