import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePromptInput, EditPromptInput } from '../dto/prompt';
import { PromptService } from '../services/prompt.service';

@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Get()
  public async getAll() {
    const prompts = await this.promptService.getAll();
    return prompts;
  }

  @Post()
  public async create(@Body() body: CreatePromptInput) {
    const { text } = body;

    const prompt = await this.promptService.create(text);

    return prompt;
  }

  @Delete(':promptId')
  public async delete(@Param('promptId') promptId: string) {
    const deletedPrompt = await this.promptService.delete(parseInt(promptId));

    return deletedPrompt;
  }

  @Patch(':promptId')
  public async editText(
    @Param('promptId') promptId: string,
    @Body() body: EditPromptInput,
  ) {
    const data = body;
    const editedPrompt = await this.promptService.edit(
      parseInt(promptId),
      data,
    );

    return editedPrompt;
  }
}
