import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostTweetInput } from 'src/dto/tweet';
import { TwitterAPIService } from 'src/services/twitter.service';

@Controller('tweet')
export class TweetController {
  private readonly twitterService: TwitterAPIService;

  constructor() {
    this.twitterService = new TwitterAPIService();
  }

  @Post()
  public async tweet(@Body() body: PostTweetInput) {
    const { text } = body;

    const tweet = await this.twitterService.post(text);

    return tweet;
  }

  @Post('next-tweet')
  public async postNextTweet() {
    const tweet = await this.twitterService.postNextTweet();

    return tweet;
  }

  @Get('user')
  async getUser() {
    const user = await this.twitterService.getUser();

    return user;
  }
}
