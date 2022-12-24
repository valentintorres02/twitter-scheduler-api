import { TweetController } from './controllers/tweet.controller';
import { Module } from '@nestjs/common';
import { PromptController } from './controllers/prompt.controller';
import { TwitterAPIService } from './services/twitter.service';
import { PromptService } from './services/prompt.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TweetController, PromptController],
  providers: [TwitterAPIService, PromptService, PrismaService],
})
export class AppModule {}
