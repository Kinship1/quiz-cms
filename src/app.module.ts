import { Module } from "@nestjs/common";
import { QuestionsModule } from "./questions/questions.module";
import { QuizModule } from "./quiz/quiz.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule, QuestionsModule, QuizModule],
})
export class AppModule {}
