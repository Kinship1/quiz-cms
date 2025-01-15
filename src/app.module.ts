import { Module } from '@nestjs/common';
import { QuestionsModule } from './questions/questions.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    QuestionsModule,
    QuizzesModule,
  ],
})
export class AppModule {}