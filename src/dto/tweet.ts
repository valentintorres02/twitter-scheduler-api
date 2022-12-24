import { IsNotEmpty } from 'class-validator';

export class PostTweetInput {
  @IsNotEmpty()
  text!: string;
}
