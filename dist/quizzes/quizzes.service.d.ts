import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
export declare class QuizzesService {
    private prisma;
    constructor(prisma: PrismaService);
    createQuiz(createQuizDto: CreateQuizDto): Promise<{
        questions: ({
            question: {
                questionType: {
                    name: string;
                    description: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
                subTopics: {
                    name: string;
                    description: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
            } & {
                questionText: string;
                options: import("@prisma/client/runtime/library").JsonValue;
                correctAnswer: import("@prisma/client/runtime/library").JsonValue;
                explanation: string | null;
                typeId: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            order: number;
            questionId: string;
            quizId: string;
        })[];
    } & {
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        config: import("@prisma/client/runtime/library").JsonValue;
    }>;
    getQuiz(id: string): Promise<{
        questions: ({
            question: {
                questionType: {
                    name: string;
                    description: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
                subTopics: {
                    name: string;
                    description: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
            } & {
                questionText: string;
                options: import("@prisma/client/runtime/library").JsonValue;
                correctAnswer: import("@prisma/client/runtime/library").JsonValue;
                explanation: string | null;
                typeId: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            order: number;
            questionId: string;
            quizId: string;
        })[];
    } & {
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        config: import("@prisma/client/runtime/library").JsonValue;
    }>;
    submitQuizResults(quizId: string, results: {
        userId: string;
        answers: any;
        score: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        quizId: string;
        userId: string;
        score: number;
        answers: import("@prisma/client/runtime/library").JsonValue;
    }>;
}
