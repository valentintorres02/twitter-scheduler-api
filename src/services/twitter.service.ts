import {
  BadRequestException,
  InternalServerErrorException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterApi } from 'twitter-api-v2';
import { PrismaService } from './prisma.service';
import { PromptService } from './prompt.service';

@Injectable()
export class TwitterAPIService {
  constructor(
    private readonly userClient: TwitterApi,
    private readonly promptService: PromptService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.userClient = new TwitterApi({
      appKey: this.configService.getOrThrow<string>('CONSUMER_KEY'),
      appSecret: this.configService.getOrThrow<string>('CONSUMER_SECRET'),
      accessToken: this.configService.getOrThrow<string>('ACCESS_TOKEN'),
      accessSecret: this.configService.getOrThrow<string>('ACCESS_SECRET'),
    });
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
    const nextPrompt = await this.prisma.prompt.findFirstOrThrow({
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
