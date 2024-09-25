import { Module } from "@nestjs/common";
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>("MONGODB_URI")
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {
    static forFeature(models: ModelDefinition[]) {
      return MongooseModule.forFeature(models);
    }
  }