import { TwitterApiTokens } from 'twitter-api-v2';

export default (): TwitterApiTokens => ({
  appKey: process.env.CONSUMER_KEY,
  appSecret: process.env.CONSUMER_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});
