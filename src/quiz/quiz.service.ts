import { Injectable, NotFoundException } from "@nestjs/common";
import { shuffle } from "lodash";

import { PrismaService } from "../prisma/prisma.service";
import { CreateQuizDto, StartQuizDto } from "./dto/start-quiz.dto";

enum QuestionType {
  MultipleChoice = "multiple_choice_single",
}

export interface QuizQuestionsData {
  id: string;
  question: string;
  options: {
    [key: string]: string;
  };
  type: QuestionType;
  correctAnswer: number[];
  explanation?: string;
}

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async startQuiz(startQuizDto: StartQuizDto): Promise<QuizQuestionsData[]> {
    let { subTopicIds, questionTypeIds, numQuestions } = startQuizDto;
    subTopicIds = [];
    questionTypeIds = [];
    const allQuestions = await this.prisma.question.findMany({
      where: {
        ...(subTopicIds &&
          subTopicIds.length > 0 && {
            subTopics: {
              some: {
                id: {
                  in: subTopicIds,
                },
              },
            },
          }),
        ...(questionTypeIds &&
          questionTypeIds.length > 0 && {
            typeId: {
              in: questionTypeIds,
            },
          }),
      },
    });

    // Shuffle the questions randomly
    const shuffledQuestions = shuffle(allQuestions);

    // Take the specified number of questions
    const selectedQuestions = shuffledQuestions.slice(0, numQuestions);

    return selectedQuestions.map((questionData) => ({
      id: questionData.id,
      question: questionData.questionText,
      options: (questionData?.options as { [key: string]: string }) || {},
      type: QuestionType.MultipleChoice,
      correctAnswer: questionData.correctAnswer as number[],
      explanation: questionData.explanation || undefined,
    }));
  }

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
    results: { userId: string; answers: any; score: number }
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
