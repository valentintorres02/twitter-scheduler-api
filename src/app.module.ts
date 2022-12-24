import { TweetController } from './controllers/tweet.controller';
import { Module } from '@nestjs/common';
import { PromptController } from './controllers/prompt.controller';
import { TwitterAPIService } from './services/twitter.service';
import { PromptService } from './services/prompt.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './services/prisma.service';
import configuration from './config/configuration';
import { TwitterApi } from 'twitter-api-v2';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration], isGlobal: true })],
  controllers: [TweetController, PromptController],
  providers: [TwitterAPIService, PromptService, PrismaService, TwitterApi],
})
export class AppModule {}
