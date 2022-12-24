import { getEnv } from 'src/util/env';
import { TwitterApiTokens } from 'twitter-api-v2';

export const tokens: TwitterApiTokens = {
  appKey: getEnv('CONSUMER_KEY'),
  appSecret: getEnv('CONSUMER_SECRET'),
  accessToken: getEnv('ACCESS_TOKEN'),
  accessSecret: getEnv('ACCESS_SECRET'),
};

export class Config {
  public readonly tokens = tokens;
}

const config = new Config();
export { config };
