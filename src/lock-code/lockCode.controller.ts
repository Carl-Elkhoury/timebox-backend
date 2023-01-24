import { Controller, Get, Param, Post } from '@nestjs/common';
import { LockCodeService } from './lockCode.service';
import { LockCode, LockCodeDocument } from './schemas/lockCode.schema';
import CryptoJS from 'crypto-js';

@Controller('lockCode')
export class LockCodeController {
  constructor(private readonly lockCodeService: LockCodeService) {}

  @Post('create')
  async createLockCode(@Param('finishTimestamp') finishTimestamp : number): Promise<LockCode> {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const container = await this.lockCodeService.getContainer();
    if (
      container.latestLockCode !== undefined &&
      container.latestLockCode.finishTimestamp > timestamp
    ) {
      return;
    }
    return await this.lockCodeService.create(finishTimestamp);
  }

  @Get()
  async getLockCode(): Promise<LockCode> {
    
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const container = await this.lockCodeService.getContainer();
    const lockCode = container?.latestLockCode;
    if (lockCode === undefined) {
      return null;
    }
    if(lockCode.finishTimestamp > timestamp) {
        lockCode.code = null;
    } else {
      return this.lockCodeService._decryptLockCode(lockCode);
    }
    return lockCode;
  }

  @Get('all')
  async getAllLockCodes() : Promise<Array<LockCode>> {
    return await this.lockCodeService.getAllExpiredCodes();
  }
}
