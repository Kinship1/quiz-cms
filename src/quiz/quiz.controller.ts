import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { QuizService } from "./quiz.service";
import { StartQuizDto } from "./dto/start-quiz.dto";

@ApiTags("quiz")
@Controller("quiz")
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post("/start")
  @ApiOperation({ summary: "Start Quiz" })
  startQuiz(@Body() startQuizDto: StartQuizDto) {
    return this.quizService.startQuiz(startQuizDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a quiz by ID" })
  getQuiz(@Param("id") id: string) {
    return this.quizService.getQuiz(id);
  }

  @Post(":id/submit")
  @ApiOperation({ summary: "Submit quiz results" })
  submitQuizResults(
    @Param("id") id: string,
    @Body() results: { userId: string; answers: any; score: number }
  ) {
    return this.quizService.submitQuizResults(id, results);
  }
}
