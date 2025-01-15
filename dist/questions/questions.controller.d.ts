import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    getQuestionTypes(): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getQuestions(subTopicIds: string[]): Promise<({
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
        options: import("@prisma/client/runtime/library").JsonValue;
        correctAnswer: import("@prisma/client/runtime/library").JsonValue;
        explanation: string | null;
        typeId: string;
    })[]>;
    submitQuestion(createQuestionDto: CreateQuestionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        questionText: string;
        options: import("@prisma/client/runtime/library").JsonValue;
        correctAnswer: import("@prisma/client/runtime/library").JsonValue;
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
        options: import("@prisma/client/runtime/library").JsonValue;
        correctAnswer: import("@prisma/client/runtime/library").JsonValue;
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
        options: import("@prisma/client/runtime/library").JsonValue;
        correctAnswer: import("@prisma/client/runtime/library").JsonValue;
        explanation: string | null;
        typeId: string;
    }>;
    rejectQuestion(id: string, reason?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        questionText: string;
        options: import("@prisma/client/runtime/library").JsonValue;
        correctAnswer: import("@prisma/client/runtime/library").JsonValue;
        explanation: string | null;
        typeId: string;
        subTopicIds: string[];
        status: string;
        rejectionReason: string | null;
    }>;
}
