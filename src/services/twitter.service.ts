import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { config } from 'src/config/config';
import { TwitterApi } from 'twitter-api-v2';
import { PrismaService } from './prisma.service';
import { PromptService } from './prompt.service';

export class TwitterAPIService {
  private userClient: TwitterApi;
  private promptService: PromptService;
  private prisma: PrismaService;

  constructor() {
    this.prisma = new PrismaService();
    this.userClient = new TwitterApi(config.tokens);
    this.promptService = new PromptService(this.prisma);
  }

  public async post(text?: string) {
    if (!text) throw new BadRequestException();

    try {
      const postedTweet = await this.userClient.v2.tweet(text);

      if (postedTweet.errors) {
        throw new BadRequestException(JSON.stringify(postedTweet.errors));
      }

      return postedTweet.data;
    } catch (err) {
      throw new InternalServerErrorException(JSON.stringify(err));
    }
  }

  public async postNextTweet() {
    const nextPrompt = await prisma?.prompt.findFirstOrThrow({
      orderBy: { priority: 'asc' },
    });

    if (!nextPrompt) {
      throw new BadRequestException('There are no tweets to post.');
    }

    const tweet = await this.post(nextPrompt.text);

    await this.promptService.delete(nextPrompt.id);

    return tweet;
  }

  public async getUser() {
    const user = await this.userClient.v2.me();

    if (user.errors) {
      throw new BadRequestException(JSON.stringify(user.errors));
    }

    return user.data;
  }
}
