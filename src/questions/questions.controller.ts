import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('types')
  @ApiOperation({ summary: 'Get all question types' })
  getQuestionTypes() {
    return this.questionsService.getQuestionTypes();
  }

  @Get()
  @ApiOperation({ summary: 'Get approved questions' })
  getQuestions(@Query('subTopicIds') subTopicIds: string[]) {
    return this.questionsService.getQuestions(subTopicIds);
  }

  @Post()
  @ApiOperation({ summary: 'Submit a new question' })
  submitQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.createTempQuestion(createQuestionDto);
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get pending questions' })
  @ApiBearerAuth()
  getPendingQuestions() {
    return this.questionsService.getPendingQuestions();
  }

  @Post(':id/approve')
  @ApiOperation({ summary: 'Approve a question' })
  @ApiBearerAuth()
  approveQuestion(@Param('id') id: string) {
    return this.questionsService.approveQuestion(id);
  }

  @Post(':id/reject')
  @ApiOperation({ summary: 'Reject a question' })
  @ApiBearerAuth()
  rejectQuestion(
    @Param('id') id: string,
    @Body('reason') reason?: string,
  ) {
    return this.questionsService.rejectQuestion(id, reason);
  }
}