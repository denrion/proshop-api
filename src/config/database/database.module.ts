import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConnectionService } from './database.service';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: DBConnectionService })],
  providers: [DBConnectionService],
  exports: [DBConnectionService],
})
export class DBModule {}
