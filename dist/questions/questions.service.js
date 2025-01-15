"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let QuestionsService = class QuestionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getQuestionTypes() {
        return this.prisma.questionType.findMany();
    }
    async getQuestions(subTopicIds) {
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
    async createTempQuestion(createQuestionDto) {
        return this.prisma.tempQuestion.create({
            data: {
                questionText: createQuestionDto.questionText,
                options: createQuestionDto.options,
                correctAnswer: createQuestionDto.correctAnswer,
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
    async approveQuestion(id) {
        const tempQuestion = await this.prisma.tempQuestion.findUnique({
            where: { id },
        });
        if (!tempQuestion) {
            throw new common_1.NotFoundException(`Question with ID ${id} not found`);
        }
        const question = await this.prisma.question.create({
            data: {
                questionText: tempQuestion.questionText,
                options: tempQuestion.options,
                correctAnswer: tempQuestion.correctAnswer,
                explanation: tempQuestion.explanation,
                typeId: tempQuestion.typeId,
                subTopics: {
                    connect: tempQuestion.subTopicIds.map((id) => ({ id })),
                },
            },
        });
        await this.prisma.tempQuestion.update({
            where: { id },
            data: { status: "approved" },
        });
        return question;
    }
    async rejectQuestion(id, reason) {
        return this.prisma.tempQuestion.update({
            where: { id },
            data: {
                status: "rejected",
                rejectionReason: reason,
            },
        });
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map