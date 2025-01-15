import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async createQuiz(createQuizDto: CreateQuizDto) {
    // Get questions based on criteria
    const questions = await this.prisma.question.findMany({
      where: {
        subTopics: {
          some: {
            id: {
              in: createQuizDto.subTopicIds,
            },
          },
        },
        ...(createQuizDto.questionTypeIds && {
          typeId: {
            in: createQuizDto.questionTypeIds,
          },
        }),
      },
      take: createQuizDto.numQuestions,
    });

    // Create quiz with questions
    return this.prisma.quiz.create({
      data: {
        name: createQuizDto.name,
        description: createQuizDto.description,
        config: createQuizDto.config,
        questions: {
          create: questions.map((question, index) => ({
            question: {
              connect: { id: question.id },
            },
            order: index,
          })),
        },
      },
      include: {
        questions: {
          include: {
            question: {
              include: {
                questionType: true,
                subTopics: true,
              },
            },
          },
        },
      },
    });
  }

  async getQuiz(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            question: {
              include: {
                questionType: true,
                subTopics: true,
              },
            },
          },
        },
      },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    return quiz;
  }

  async submitQuizResults(
    quizId: string,
    results: { userId: string; answers: any; score: number },
  ) {
    return this.prisma.quizResult.create({
      data: {
        quiz: {
          connect: { id: quizId },
        },
        userId: results.userId,
        answers: results.answers,
        score: results.score,
      },
    });
  }
}