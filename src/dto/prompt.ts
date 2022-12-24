import { IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePromptInput {
  @IsNotEmpty()
  text!: string;
}

export class EditPromptInput {
  @IsOptional()
  priority!: number;

  @IsOptional()
  text!: string;
}
