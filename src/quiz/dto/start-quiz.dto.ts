import {
  IsString,
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateQuizDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  numQuestions: number;

  @ApiProperty()
  @IsArray()
  subTopicIds: string[];

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  questionTypeIds?: string[];

  @ApiProperty()
  @IsObject()
  config: Record<string, any>;
}

export class StartQuizDto {
  @ApiProperty()
  @IsNumber()
  numQuestions: number;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  subTopicIds: string[];

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  questionTypeIds?: string[];
}
