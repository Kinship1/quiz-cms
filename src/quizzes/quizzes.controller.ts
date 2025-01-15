import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.createQuiz(createQuizDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quiz by ID' })
  getQuiz(@Param('id') id: string) {
    return this.quizzesService.getQuiz(id);
  }

  @Post(':id/submit')
  @ApiOperation({ summary: 'Submit quiz results' })
  submitQuizResults(
    @Param('id') id: string,
    @Body() results: { userId: string; answers: any; score: number },
  ) {
    return this.quizzesService.submitQuizResults(id, results);
  }
}