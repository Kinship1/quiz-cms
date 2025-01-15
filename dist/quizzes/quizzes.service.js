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
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let QuizzesService = class QuizzesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createQuiz(createQuizDto) {
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
    async getQuiz(id) {
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
            throw new common_1.NotFoundException(`Quiz with ID ${id} not found`);
        }
        return quiz;
    }
    async submitQuizResults(quizId, results) {
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
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map