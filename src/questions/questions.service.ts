import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async getQuestionTypes() {
    return this.prisma.questionType.findMany();
  }

  async getQuestions(subTopicIds?: string[]) {
    const where = subTopicIds
      ? {
          subTopics: {
            some: {
              id: {
                in: subTopicIds,
              },
            },
          },
        }
      : {};

    return this.prisma.question.findMany({
      where,
      include: {
        questionType: true,
        subTopics: true,
      },
    });
  }

  async createTempQuestion(createQuestionDto: CreateQuestionDto) {
    return this.prisma.tempQuestion.create({
      data: {
        questionText: createQuestionDto.questionText,
        options: createQuestionDto.options as Prisma.InputJsonValue,
        correctAnswer: createQuestionDto.correctAnswer as Prisma.InputJsonValue,
        explanation: createQuestionDto.explanation,
        typeId: createQuestionDto.typeId,
        subTopicIds: createQuestionDto.subTopicIds,
      },
    });
  }

  async getPendingQuestions() {
    return this.prisma.tempQuestion.findMany({
      where: {
        status: "pending",
      },
    });
  }

  async approveQuestion(id: string) {
    const tempQuestion = await this.prisma.tempQuestion.findUnique({
      where: { id },
    });

    if (!tempQuestion) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    // Create approved question
    const question = await this.prisma.question.create({
      data: {
        questionText: tempQuestion.questionText,
        options: tempQuestion.options as Prisma.InputJsonValue,
        correctAnswer: tempQuestion.correctAnswer as Prisma.InputJsonValue,
        explanation: tempQuestion.explanation,
        typeId: tempQuestion.typeId,
        subTopics: {
          connect: tempQuestion.subTopicIds.map((id) => ({ id })),
        },
      },
    });

    // Update temp question status
    await this.prisma.tempQuestion.update({
      where: { id },
      data: { status: "approved" },
    });

    return question;
  }

  async rejectQuestion(id: string, reason?: string) {
    return this.prisma.tempQuestion.update({
      where: { id },
      data: {
        status: "rejected",
        rejectionReason: reason,
      },
    });
  }
}
