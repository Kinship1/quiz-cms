import { IsString, IsArray, IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  questionText: string;

  @ApiProperty()
  @IsArray()
  options: any[];

  @ApiProperty()
  @IsObject()
  correctAnswer: any;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  explanation?: string;

  @ApiProperty()
  @IsString()
  typeId: string;

  @ApiProperty()
  @IsArray()
  subTopicIds: string[];
}