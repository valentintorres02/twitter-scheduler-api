import { BadRequestException, Injectable } from '@nestjs/common';
import { EditPromptInput } from 'src/dto/prompt';
import { PrismaService } from './prisma.service';

@Injectable()
export class PromptService {
  constructor(private prisma: PrismaService) {}

  public async getAll() {
    const prompts = await this.prisma.prompt.findMany({
      orderBy: { priority: 'asc' },
    });

    return prompts;
  }

  public async create(text: string) {
    const lastPromptPriority = await this.prisma.prompt.findFirst({
      orderBy: { priority: 'desc' },
      select: { priority: true },
    });

    const lastPriority = lastPromptPriority?.priority ?? -1;

    return await this.prisma.prompt.create({
      data: {
        priority: lastPriority + 1,
        text,
      },
    });
  }

  public async delete(id: number) {
    const promptToDelete = await this.prisma.prompt.findUniqueOrThrow({
      where: { id },
    });

    const { priority } = promptToDelete;

    await this.prisma.prompt.updateMany({
      data: {
        priority: {
          decrement: 1,
        },
      },
      where: {
        priority: { gt: priority },
      },
    });

    return await this.prisma.prompt.delete({ where: { id } });
  }

  public async changePriority(id: number, priority: number) {
    const lastPromptPriority = await this.prisma.prompt.findFirst({
      orderBy: { priority: 'desc' },
      select: { priority: true },
    });

    const lastPriority = lastPromptPriority?.priority ?? 0;

    if (priority > lastPriority) {
      throw new BadRequestException(
        'The new priority sent is greater than the current lowest.',
      );
    }

    const promptToEdit = await this.prisma.prompt.findUniqueOrThrow({
      where: { id },
    });

    if (priority === promptToEdit.priority) {
      throw new BadRequestException(
        'The new priority sent is equal to the current priority of the selected prompt.',
      );
    }

    if (promptToEdit.priority < priority) {
      await this.prisma.prompt.update({ data: { priority }, where: { id } });
      return await this.prisma.prompt.updateMany({
        data: {
          priority: {
            decrement: 1,
          },
        },
        where: {
          priority: {
            lte: priority,
            gt: promptToEdit.priority,
          },
          AND: {
            id: {
              not: id,
            },
          },
        },
      });
    }

    if (promptToEdit.priority > priority) {
      await this.prisma.prompt.update({ data: { priority }, where: { id } });
      return await this.prisma.prompt.updateMany({
        data: {
          priority: {
            increment: 1,
          },
        },
        where: {
          priority: {
            gte: priority,
            lt: promptToEdit.priority,
          },
          AND: {
            id: {
              not: id,
            },
          },
        },
      });
    }
  }

  public async edit(id: number, data: EditPromptInput) {
    if (data.priority || data.priority === 0) {
      await this.changePriority(id, data.priority);
    }

    return await this.prisma.prompt.update({ data, where: { id } });
  }
}
