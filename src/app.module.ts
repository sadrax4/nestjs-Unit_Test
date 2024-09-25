import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
