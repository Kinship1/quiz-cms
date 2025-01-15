export declare class CreateQuizDto {
    name: string;
    description?: string;
    numQuestions: number;
    subTopicIds: string[];
    questionTypeIds?: string[];
    config: Record<string, any>;
}
