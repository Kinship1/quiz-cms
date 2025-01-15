import { PrismaService } from "../prisma/prisma.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { Prisma } from "@prisma/client";
export declare class QuestionsService {
    private prisma;
    constructor(prisma: PrismaService);
    getQuestionTypes(): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getQuestions(subTopicIds?: string[]): Promise<({
        questionType: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        subTopics: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        questionText: string;
        options: Prisma.JsonValue;
        correctAnswer: Prisma.JsonValue;
        explanation: string | null;
        typeId: string;
    })[]>;
    createTempQuestion(createQuestionDto: CreateQuestionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        questionText: string;
        options: Prisma.JsonValue;
        correctAnswer: Prisma.JsonValue;
        explanation: string | null;
        typeId: string;
        subTopicIds: string[];
        status: string;
        rejectionReason: string | null;
    }>;
    getPendingQuestions(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        questionText: string;
        options: Prisma.JsonValue;
        correctAnswer: Prisma.JsonValue;
        explanation: string | null;
        typeId: string;
        subTopicIds: string[];
        status: string;
        rejectionReason: string | null;
    }[]>;
    approveQuestion(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        questionText: string;
        options: Prisma.JsonValue;
        correctAnswer: Prisma.JsonValue;
        explanation: string | null;
        typeId: string;
    }>;
    rejectQuestion(id: string, reason?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        questionText: string;
        options: Prisma.JsonValue;
        correctAnswer: Prisma.JsonValue;
        explanation: string | null;
        typeId: string;
        subTopicIds: string[];
        status: string;
        rejectionReason: string | null;
    }>;
}
